import { ISortedCityIndicatorType } from "./types";

export const getCityIndicatorCountPercentageValue = (
  sortedBop500CityindicatorData: ISortedCityIndicatorType[],
  indicatorCount: number
) => {
  if (sortedBop500CityindicatorData.length) {
    const maxCityIndicatorCount = sortedBop500CityindicatorData[0].count;
    const minCityIndicatorCount = sortedBop500CityindicatorData.at(-1).count;
    const maxValue = maxCityIndicatorCount - minCityIndicatorCount;
    // calculating the percentage value of count out of max value => what percentage of maxValue is count value
    const percentageValue = (indicatorCount / maxValue) * 100;
    return percentageValue;
  }
  return 0;
};
