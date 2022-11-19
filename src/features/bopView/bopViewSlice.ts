import { startAppListening } from "@/app/listenerMiddleware";
import { citiesApi } from "@/app/services/cities";
import { cityApi } from "@/app/services/city";
import defaultSettings from "@/constants/default-settings";
import { KEPLER_DATASET_TYPE, KEPLER_INSTANCE_IDS } from "@/enums/kepler.enums";
import { prepareData } from "@/helpers/keplerHandler";
import { BopDataset } from "@/types/BopDatasets";
import { ICity } from "@/types/City";
import { FlyToInterpolator, TRANSITION_EVENTS } from "@deck.gl/core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bbox } from "@turf/turf";
import {
  addDataToMap,
  fitBounds,
  layerConfigChange,
  updateMap,
} from "kepler.gl/actions";
import mapboxgl from "mapbox-gl";
import { setCityId, setCityMetaData } from "../city/citySlice";
import { initialState } from "./initialState";
// the view slice contains all the states that relate to the application view ( map )
export const bopViewSlice = createSlice({
  name: "bopView",
  initialState,
  reducers: {
    //* Get Ref to Mapbox Map
    setMap: (state, action: PayloadAction<mapboxgl.Map>) => {
      state.map = action.payload;
    },
    //* this action is used to set cities after getting the data from API
    setCities: {
      reducer: (state, action: PayloadAction<ICity[]>) => {
        state.cities = action.payload;
      },
      //* to Add More Validation
      prepare: (cities: ICity[]) => {
        return { payload: cities };
      },
    },
    //* this action is used to set selected cities
    setSelectedCities: {
      reducer: (state, action: PayloadAction<ICity[]>) => {
        state.selectedCities = action.payload;
      },
      //* to Add More Validation
      prepare: (cities: ICity[]) => {
        return { payload: cities };
      },
    },
    //* this action is used to set active city id
    setActiveCityId: (state, action: PayloadAction<number>) => {
      state.activeCityId = action.payload;
    },
    //* Reset The States
    reset: () => {
      // state.activeCityId = initialState.activeCityId;
    },
    addBopDataToMap: (_, __: PayloadAction<BopDataset>) => {},
  },
});

export const {
  setCities,
  setSelectedCities,
  reset,
  setActiveCityId,
  setMap,
  addBopDataToMap,
} = bopViewSlice.actions;

//* listener middleware is used to listen to the redux store and dispatch actions to the reducer
// Listen on getting the Bop Cities Data Successfully
startAppListening({
  matcher: citiesApi.endpoints.getAllCities.matchFulfilled,
  effect: (action, listenerApi) => {
    const citiesDotsData = action.payload;
    // Add Data to Map with the right config
    listenerApi.dispatch(addBopDataToMap(citiesDotsData));
    listenerApi.dispatch(setCities(citiesDotsData.data));
    const userData = listenerApi.getState().auth.userData;
    if (!userData) return; // user not logged in
    let default_city = citiesDotsData.data.filter(
      (city) => city.city_id === userData.default_city
    );
    listenerApi.dispatch(setSelectedCities(default_city));

    // Set Cities in BopView
  },
});

// Listen on any changes in selected cities
startAppListening({
  predicate: (_, currentState, previousState) => {
    // Trigger logic whenever this field changes
    return (
      currentState.bopView.selectedCities.length !==
      previousState.bopView.selectedCities.length
    );
  },
  effect: (_, listenerApi) => {
    // Cancel
    listenerApi.cancelActiveListeners();

    //* Get Previous State
    const { selectedCities: previousSelectedCities } =
      listenerApi.getOriginalState().bopView;

    //* Get current selected cities, active City Id
    const { selectedCities, activeCityId } = listenerApi.getState().bopView;

    //* check if selected cities array is empty
    if (!selectedCities.length) {
      //* if empty reset the states
      listenerApi.dispatch(reset());
      return;
    }
    //* check if the current Active City exists in the selected cities
    const activeCityExists = selectedCities.some((selectedCity: ICity) => {
      return selectedCity.city_id === activeCityId;
    });

    if (
      !activeCityExists ||
      previousSelectedCities.length < selectedCities.length
    ) {
      //* if the active city is not in the selected cities or when we just selected a new city , set the active city to the last city in the selected cities
      listenerApi.dispatch(setActiveCityId(selectedCities.at(-1).city_id));
    }
  },
});

// listen on any changes in active city id
startAppListening({
  actionCreator: setActiveCityId,
  effect: (action, listenerApi) => {
    const cityId = action.payload as number;

    if (!cityId) return;
    // Get City MetaData by Id
    const cityMetaData: ICity = listenerApi
      .getState()
      .bopView.cities.find((city) => city.city_id === cityId);

    //* Set CityMetaData and CityId
    listenerApi.dispatch(setCityId(cityId));
    listenerApi.dispatch(setCityMetaData(cityMetaData));
    //* Hide Layers
    const layers =
      listenerApi.getState().keplerGl[KEPLER_INSTANCE_IDS.MAP].visState.layers;

    const layersToHide = layers.filter((layer) => {
      return (
        layer.config.dataId.includes(
          `${KEPLER_DATASET_TYPE.FREE_DATA}_${cityId}`
        ) ||
        layer.config.dataId.includes(
          `${KEPLER_DATASET_TYPE.PAID_DATA}_${cityId}`
        )
      );
    });
    //* Hiding layers
    layersToHide.forEach((layer) => {
      listenerApi.dispatch(
        layerConfigChange(layer, {
          ...layer.config,
          isVisible: false,
        })
      );
    });

    //* Start Animation
    listenerApi.dispatch(
      updateMap({
        bearing: 0,
        latitude: cityMetaData.zoom_latitude || cityMetaData.city_latitude,
        longitude: cityMetaData.zoom_longitude || cityMetaData.city_longitude,
        pitch: 0,
        zoom: cityMetaData.city_zoom || 8,
        transitionDuration: 2750,
        transitionInterpolator: new FlyToInterpolator(),
        // transitionInterruption: TRANSITION_EVENTS.IGNORE,
        onTransitionEnd: () => {
          //* Get City Boundaries
          listenerApi.dispatch(
            cityApi.endpoints.getCityGeoBoundary.initiate(
              {
                cityId,
                adminLevel: cityMetaData.city_administrative_level,
              },
              { subscribe: false, forceRefetch: true }
            )
          );
        },
      })
    );
  },
});

// Listen on Reset Action Event
startAppListening({
  actionCreator: reset,
  effect: (_, listenerApi) => {
    //* Reset Map to default State
    listenerApi.dispatch(setActiveCityId(initialState.activeCityId));
    listenerApi.dispatch(
      updateMap({
        ...defaultSettings.Kepler.viewState,
        transitionDuration: 2000,
        zoom: 1,
        transitionInterpolator: new FlyToInterpolator(),
        transitionInterruption: TRANSITION_EVENTS.IGNORE,
        onTransitionStart: () => {},
        onTransitionEnd: () => {},
      })
    );
  },
});

// add data to map
startAppListening({
  actionCreator: addBopDataToMap,
  effect: (action, listenerApi) => {
    const bopData = action.payload;
    const { activeCityId, cities } = listenerApi.getState().bopView;
    const activeCity = cities.find((city) => city.city_id === activeCityId);
    // Check if data already exists
    let currentDatasets = Object.keys(
      listenerApi.getState().keplerGl[KEPLER_INSTANCE_IDS.MAP].visState.datasets
    );

    if (
      bopData.type === KEPLER_DATASET_TYPE.CITIES_DOTS ||
      !currentDatasets.includes(`${bopData.type}_${bopData.data.city_id}`)
    ) {
      //* Data doesn't exist, add it

      listenerApi.dispatch(addDataToMap(prepareData(bopData, activeCity)));
      return;
    }

    //* Data exists, show it
    switch (bopData.type) {
      case KEPLER_DATASET_TYPE.FREE_DATA:
      case KEPLER_DATASET_TYPE.PAID_DATA: {
        //* set layer visibility to true
        let layers =
          listenerApi.getState().keplerGl[KEPLER_INSTANCE_IDS.MAP].visState
            .layers;
        let layersToShow = layers.filter((layer) => {
          return (
            layer.config.dataId === `${bopData.type}_${bopData.data.city_id}`
          );
        });

        layersToShow.forEach((layer) => {
          listenerApi.dispatch(
            layerConfigChange(layer, {
              ...layer.config,
              isVisible: true,
            })
          );
        });
        break;
      }
      case KEPLER_DATASET_TYPE.CITY_BOUNDARY: {
        //* fitBounds
        if (!activeCity.zoom_latitude || !activeCity.zoom_longitude) {
          let _bbox = bbox(bopData.data);
          listenerApi.dispatch(fitBounds(_bbox));
        }
        break;
      }
    }
  },
});

export default bopViewSlice.reducer;
