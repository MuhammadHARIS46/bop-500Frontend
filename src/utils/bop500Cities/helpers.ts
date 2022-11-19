import { ISortedCityIndicatorType } from "@/components/HeroTextContainer/types";
import { IBop500CityTYPE } from "@/types/CityType";
import numeral from "numeral";
import { CitiesService } from "@/services/graphql/cities.service";
import client from "apollo-client";

import * as R from "ramda";
import { getIndicatorNameMapping } from "./constants";

const byCount = R.descend<ISortedCityIndicatorType>(R.prop("count"));
const byPopulation = R.descend<ISortedCityIndicatorType>(R.prop("population"));
/**
 * Sorts the data with city indicator count and if counts are same , then sort in descending order with population
 */
export const sortWithIndicatorCount = (
  data: ISortedCityIndicatorType[]
): ISortedCityIndicatorType[] => R.sortWith([byCount, byPopulation])(data);

export const sortBop500DataWithCityIndicatorName = (
  bop500Data: IBop500CityTYPE[],
  subCategory: string
) =>
  sortWithIndicatorCount(
    bop500Data.map((city) => ({
      ...city.cityIndicators.find(
        ({ indicatorName }) =>
          indicatorName === getIndicatorNameMapping(subCategory)
      ),
      population: numeral(city.city_population).value(),
    }))
  );

export const getBop500Data = async () => {
  const citiesService = new CitiesService();

  const { data } = await client.query({
    query: citiesService.GET_BOP500_CITY_TABLE_QUERY,
  });

  const bop500data: IBop500CityTYPE[] = data?.getAllCities?.map((cityData) => ({
    city_id: cityData.city_id,
    cityIndicators: cityData?.cityIndicators?.map((cityIndicator) => ({
      cityAdminLevel: cityIndicator?.cityAdminLevel,
      cityName: cityIndicator?.cityName,
      count: cityIndicator?.indicatorDetails?.count ?? 0,
      indicatorId: cityIndicator?.indicatorId,
      indicatorName: cityIndicator?.indicatorName,
      isSuccess: cityIndicator?.isSuccess,
    })),
    city_name: cityData.city_name,
    city_population: cityData.city_population,
    country_name: cityData.country_name,
    country_region: cityData?.countryDetail?.length
      ? cityData?.countryDetail[0]?.country_region
      : "",
    country_subregion: cityData?.countryDetail?.length
      ? cityData?.countryDetail[0]?.country_subregion
      : "",
  }));
  const totalAfricanCities = bop500data.filter(
    ({ country_region }) => country_region === "Africa"
  ).length;
  const totalAmericasCities = bop500data.filter(
    ({ country_region }) => country_region === "Americas"
  ).length;
  const totalAsianCities = bop500data.filter(
    ({ country_region }) => country_region === "Asia"
  ).length;
  const totalEuropeanCities = bop500data.filter(
    ({ country_region }) => country_region === "Europe"
  ).length;
  const totalOceaniaCities = bop500data.filter(
    ({ country_region }) => country_region === "Oceania"
  ).length;

  return {
    bop500data,
    totalAfricanCities,
    totalAmericasCities,
    totalAsianCities,
    totalEuropeanCities,
    totalOceaniaCities,
  };
};
