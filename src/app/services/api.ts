import { config } from "@config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define our single API slice object
export const api = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  // All of our requests will have URLs starting with '/cities'
  baseQuery: fetchBaseQuery({
    baseUrl: config.apiUrl,

    prepareHeaders: (headers) => {
      const bopAccessToken = Cookies.get("bop-token");
      if (bopAccessToken) {
        headers.set("authorization", `Bearer ${bopAccessToken}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
