import { IBop500CityTYPE, ICityType } from "@/types/CityType";
import { ICategoryFooter } from "@/types/SubCategorySmallCards";

export interface CitiesState {
  allCities: ICityType[];
  loading: boolean;
  totalCitiesInRegion: { [key: string]: number };
  selectedCities: ICityType[];
  bop500TableData: IBop500CityTYPE[]; // data for BOP500 table
  activeCityTab: number; // city_id
  museumsLayer: { [key: string]: any };
  movieTheatersLayer: { [key: string]: any };
  publicLibrariesLayer: { [key: string]: any };
  operaHousesLayer: { [key: string]: any };
  concertHallsLayer: { [key: string]: any };
  artGalleriesLayer: { [key: string]: any };
  activeSubcategoryTab: string;
  activeCategory: ICategoryFooter;
  categories: ICategoryFooter[];
}

export const BOP500FooterTabValue = {
  id: "bop500-footer",
  name: "BOP500",
  totalSubCategories: 0,
  subCategories: [],
};

export const initialState: CitiesState = {
  allCities: [],
  loading: false,
  totalCitiesInRegion: {},
  selectedCities: [],
  bop500TableData: [],
  activeCityTab: undefined,
  museumsLayer: {},
  movieTheatersLayer: {},
  publicLibrariesLayer: {},
  operaHousesLayer: {},
  concertHallsLayer: {},
  artGalleriesLayer: {},
  activeSubcategoryTab: undefined,
  activeCategory: undefined,
  categories: [],
};
