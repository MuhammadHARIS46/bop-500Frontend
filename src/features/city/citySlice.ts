import { startAppListening } from "@/app/listenerMiddleware";
import { KEPLER_DATASET_TYPE } from "@/enums/kepler.enums";
import { CityData, ICity, ICityBoundary } from "@/types/City";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cityApi } from "@services/city";
import { setPaid } from "../auth/authSlice";
import { addBopDataToMap } from "../bopView/bopViewSlice";
import { initialState } from "./initialState";
const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCityData: {
      reducer: (state, action: PayloadAction<CityData>) => {
        state.cityData = action.payload;
      },
      prepare: (cityData: CityData) => {
        return { payload: cityData };
      },
    },
    setCityBoundaries: {
      reducer: (state, action: PayloadAction<ICityBoundary>) => {
        state.cityBoundaries = [...state.cityBoundaries, action.payload];
      },
      prepare: (cityBoundary: ICityBoundary) => {
        return { payload: cityBoundary };
      },
    },
    setCategories: (
      state,
      action: PayloadAction<{ label: string; subList: string[] }[]>
    ) => {
      state.categories = action.payload;
    },
    setCityId: (state, action: PayloadAction<number>) => {
      state.cityId = action.payload;
    },
    setCityMetaData: (state, action: PayloadAction<ICity>) => {
      state.cityMetaData = action.payload;
    },
    setActiveComposite: (state, action: PayloadAction<string>) => {
      state.activeComposite = action.payload;
    },
    setActiveIndicator: (state, action: PayloadAction<string>) => {
      state.activeIndicator = action.payload;
    },
  },
});

export const {
  setActiveIndicator,
  setActiveComposite,
  setCityData,
  setCategories,
  setCityBoundaries,
  setCityMetaData,
  setCityId,
} = citySlice.actions;
export default citySlice.reducer;

//* listener middleware is used to listen to the redux store and dispatch actions to the reducer

// Listen on getting the Bop City Data Successfully

startAppListening({
  actionCreator: setCityData,
  effect: (action, listenerApi) => {
    const cityData = action.payload;
    listenerApi.dispatch(
      setPaid(cityData.type === KEPLER_DATASET_TYPE.PAID_DATA)
    );
    listenerApi.dispatch(addBopDataToMap(cityData));
  },
});

// Listen on getting the Bop City Boundaries Successfully
startAppListening({
  matcher: cityApi.endpoints.getCityGeoBoundary.matchFulfilled,
  effect: (action, listenerApi) => {
    const CityBoundary = action.payload;
    listenerApi.dispatch(addBopDataToMap(CityBoundary));
  },
});
