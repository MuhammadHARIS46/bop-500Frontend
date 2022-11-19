import { AuthUserDataType } from "@/features/auth/initialState";
import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    validateUserToken: builder.query({
      query: () => `/auth/token`,
      transformResponse: (response: AuthUserDataType) => response,
    }),

    login: builder.mutation({
      query: (payload: { username: string; password: string }) => ({
        url: `/auth/login`,
        method: "post",
        body: payload,
      }),
      transformResponse: (response: {
        access_token: string;
        refresh_token: string;
      }) => response,
    }),

    register: builder.mutation({
      query: (payload: {
        username: string;
        password: string;
        email: string;
        default_city: number;
        user_agreement?: string;
      }) => ({
        url: `/auth/signup`,
        method: "post",
        body: { ...payload, user_agreement: "Test" },
      }),
      transformResponse: (response: AuthUserDataType) => {
        return {
          username: response.username,
          user_id: response.user_id,
          default_city: response.default_city,
          email: response.email,
          roles: response.roles,
        };
      },
    }),
  }),
});

export const {
  useValidateUserTokenQuery,
  useLoginMutation,
  useRegisterMutation,
} = authApi;
