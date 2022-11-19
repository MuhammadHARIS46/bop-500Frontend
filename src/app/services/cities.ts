import { KEPLER_DATASET_TYPE } from "@/enums/kepler.enums";
import { CitiesDots } from "@/types/BopDatasets";
import { ICity } from "@/types/City";
import { api } from "./api";

export const citiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //* Get Bop Cities
    getAllCities: builder.query({
      query: () => `/cities`,
      transformResponse: (response: ICity[]): CitiesDots => {
        //* Transform the response to match the shape of the reducer
        return {
          type: KEPLER_DATASET_TYPE.CITIES_DOTS,
          data: response,
        };
      },
    }),
  }),
});

export const { useGetAllCitiesQuery } = citiesApi;
