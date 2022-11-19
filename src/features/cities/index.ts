import { ICategoryFooter } from "@/types/SubCategorySmallCards";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setAllCities: (state, { payload }: PayloadAction<any>) => {
      state.allCities = payload;
    },
    setLoading: (state, { payload }: PayloadAction<any>) => {
      state.loading = payload;
    },
    setTotalCitiesInRegion: (state, { payload }: PayloadAction<any>) => {
      state.totalCitiesInRegion = payload;
    },
    setBop500TableData: (state, { payload }: PayloadAction<any>) => {
      state.bop500TableData = payload;
    },
    setSelectedCities: (state, { payload }: PayloadAction<any>) => {
      state.selectedCities = payload;
    },
    setActiveCityTab: (state, { payload }: PayloadAction<any>) => {
      state.activeCityTab = payload;
    },
    setActiveSubcategoryTab: (state, { payload }: PayloadAction<any>) => {
      state.activeSubcategoryTab = payload;
    },
    setActiveCategory: (state, { payload }: PayloadAction<ICategoryFooter>) => {
      state.activeCategory = payload;
    },
    setCategories: (state, { payload }: PayloadAction<ICategoryFooter[]>) => {
      state.categories = payload;
    },
  },
});

export const {
  setAllCities,
  setLoading,
  setTotalCitiesInRegion,
  setSelectedCities,
  setBop500TableData,
  setActiveCityTab,
  setActiveSubcategoryTab,
  setActiveCategory,
  setCategories,
} = citiesSlice.actions;

export default citiesSlice.reducer;
