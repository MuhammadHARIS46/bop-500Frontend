import { KEPLER_DATASET_TYPE } from "@/enums/kepler.enums";
import { ICityBounds } from "./CityBounds";

export interface ICity {
  city_id: number;
  city_name: string;
  state_id: number;
  state_code: string;
  city_nominatim: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  city_latitude: number;
  city_longitude: number;
  zoom_latitude: number;
  zoom_longitude: number;
  city_wikiDataId: string;
  bop_wikiDataId: string;
  city_population: string;
  city_osm_id: number;
  city_administrative_level: number;
  city_zoom: number;
}

export enum CITY_DATA_TYPE {
  FREE = "free",
  PAID = "paid",
}

export type CityData = ICityDataFree | ICityDataPaid;

//* Level 1
export interface ICityDataFree {
  type: KEPLER_DATASET_TYPE.FREE_DATA;
  data: {
    city_id: number;
    composite_id: number;
    categories: {
      [key: string]: string[];
    };
    cityInformation: {
      composite_normalized_count_percentage: number;
    };
    IndicatorsData: { address_latitude: number; address_longitude: number }[];
  };
}

// Level 2
export interface ICityDataPaid {
  type: KEPLER_DATASET_TYPE.PAID_DATA;
  data: {
    city_id: number;
    composite_id: number;
    cityInformation: {
      composite_normalized_count_percentage: number;
    };
    IndicatorsData: IndicatorsDatum[];
  };
}

export interface IndicatorsDatum {
  IndicatorName: string;
  count: number;
  indicatorData: IndicatorDatum[];
  categories: string[];
}

export interface IndicatorDatum {
  categoryData: CategoryDatum[];
  count: number;
  category_name_en: string;
}

export interface CategoryDatum {
  categories: string[];
  category_name_en: string;
  name_en: string;
  reviewsCount: number;
  state_name?: string;
  address_latitude: number;
  address_longitude: number;
}

export interface ICityState {
  cityId: number;
  cityMetaData: ICity;
  activeComposite: string;
  citiesData: any;
  cityData: CityData | undefined;
  activeIndicator: string;
  categories: { label: string; subList: string[] }[];
  cityBoundaries: ICityBoundary[];
}

export interface ICityBoundary {
  city_id: number;
  boundary: ICityBounds;
  type: BOUNDARIES_TYPES;
}

export enum BOUNDARIES_TYPES {
  INNER_BOUNDARY = "inner_boundary",
  OUTER_BOUNDARY = "outer_boundary",
}
