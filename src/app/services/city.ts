import { KEPLER_DATASET_TYPE } from "@/enums/kepler.enums";
import { CityBoundary } from "@/types/BopDatasets";
import { CityData } from "@/types/City";
import { ICityBounds } from "@/types/CityBounds";
import { api } from "./api";

export const cityApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCityData: builder.query({
      query: ({ cityId, compositeId }) =>
        `/cities/${cityId}/composites/${compositeId}`,
      transformResponse: (response: any): CityData => {
        return {
          type: response.type,
          data: {
            ...response,
          },
        };
      },
    }),
    getCityGeoBoundary: builder.query({
      query: ({ cityId, adminLevel }) =>
        `/geoboundaries/city/${cityId}/adminlevel/${adminLevel}`,

      transformResponse: (response: ICityBounds): CityBoundary => {
        return {
          type: KEPLER_DATASET_TYPE.CITY_BOUNDARY,
          data: response,
        };
      },
    }),
  }),
});

export const { useGetCityDataQuery, useGetCityGeoBoundaryQuery } = cityApi;
