export interface ICityType {
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
  city_wikiDataId: string;
  bop_wikiDataId: string;
  city_population: string;
  city_osm_id: number;
  city_administrative_level: number;
}

export interface ICityDetails {
  city_id: number;
  city_latitude: number;
  city_longitude: number;
  city_name: string;
  country_name: string;
  state_name: string;
  __typename: string;
}

export interface ICityIndicatorType {
  cityAdminLevel: number;
  cityName: string;
  count: number;
  indicatorId: number;
  indicatorName: string;
  isSuccess: boolean;
}

//City type for BOP500 table
export interface IBop500CityTYPE {
  cityIndicators: ICityIndicatorType[];
  city_id: number;
  city_name: string;
  city_population: string;
  country_name: string;
  country_region: string;
  country_subregion: string;
}
