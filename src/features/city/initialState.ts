import { ICityState } from "@/types/City";

export const initialState: ICityState = {
  activeComposite: "BOP500", // Initial Composite
  activeIndicator: "Museums", // for cultural facilities
  citiesData: [],
  categories: [],
  cityId: undefined,
  cityMetaData: undefined,
  cityBoundaries: [],
  cityData: undefined,
};
