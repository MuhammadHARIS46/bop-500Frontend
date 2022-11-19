import { KEPLER_DATASET_TYPE } from "@/enums/kepler.enums";
import { CityData, ICity } from "./City";
import { ICityBounds } from "./CityBounds";

export type BopDataset = CitiesDots | CityBoundary | CityData;

export interface CitiesDots {
  type: KEPLER_DATASET_TYPE.CITIES_DOTS;
  data: ICity[];
}

export interface CityBoundary {
  type: KEPLER_DATASET_TYPE.CITY_BOUNDARY;
  data: ICityBounds;
}
