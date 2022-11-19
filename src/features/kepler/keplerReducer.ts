import defaultSettings from "@/constants/default-settings";
import { KeplerState } from "@/types/kepler.types";
import keplerGlReducer from "kepler.gl/reducers";
import { AnyAction, Reducer } from "redux";

const customizedKeplerGlReducer: Reducer<KeplerState, AnyAction> =
  keplerGlReducer.initialState({
    //* Set The Default zoom, lat,long
    mapState: {
      bearing: 0,
      dragRotate: false,
      latitude: defaultSettings.Kepler.viewState.latitude,
      longitude: defaultSettings.Kepler.viewState.longitude,
      pitch: 0,
      zoom: defaultSettings.Kepler.viewState.zoom,
      isSplit: false,
    },

    uiState: {
      // hide side panel to disallowed user customize the map
      readOnly: true,
      // Avoid opening add data to map modal
      currentModal: null,
      // customize which map control button to show
      mapControls: {
        visibleLayers: {
          show: false,
        },
        mapLegend: {
          show: true,
          active: true,
        },
        toggle3d: {
          show: false,
        },
        splitMap: {
          show: false,
        },
      },
    },
    mapStyle: {
      styleType: "dark",
      topLayerGroups: {
        label: true,
      },
      visibleLayerGroups: {
        label: true,
        road: true,
        border: false,
        building: false,
        water: true,
        land: true,
        "3d building": false,
      },
      threeDBuildingColor: [
        9.665468314072013, 17.18305478057247, 31.1442867897876,
      ],
    },
  });

export default customizedKeplerGlReducer;
