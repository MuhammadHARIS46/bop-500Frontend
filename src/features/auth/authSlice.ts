import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUserDataType, IAuthState, initialState } from "./initialState";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPaid: (state: IAuthState, { payload }: PayloadAction<boolean>) => {
      state.isPaid = payload;
    },
    setIsAuthenticated: (
      state: IAuthState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isAuthenticated = payload;
    },
    setUserData: (
      state: IAuthState,
      { payload }: PayloadAction<AuthUserDataType>
    ) => {
      state.userData = payload;
    },
    setAuthIsLoading: (
      state: IAuthState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isLoading = payload;
    },
  },
});

export const { setPaid, setUserData, setIsAuthenticated, setAuthIsLoading } =
  authSlice.actions;

export default authSlice.reducer;
