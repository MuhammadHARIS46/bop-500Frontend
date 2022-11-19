import { ICityIndicatorType } from "@/types/CityType";

export interface ICategoryWiseCityIndicatorType {
  rank: number;
  percentageValue: number;
}

export interface ISortedCityIndicatorType extends ICityIndicatorType {
  population: number;
}
