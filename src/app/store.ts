import auth from "@features/auth/authSlice";
import bopView from "@features/bopView/bopViewSlice";
import citiesSlice from "@features/cities";
import city from "@features/city/citySlice";
import keplerGl from "@features/kepler/keplerReducer";
import { Action, configureStore } from "@reduxjs/toolkit";
import { taskMiddleware } from "react-palm/tasks";
import type { TypedUseSelectorHook } from "react-redux";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import type { ThunkAction } from "redux-thunk";
import { listenerMiddleware } from "./listenerMiddleware";
import { api } from "./services/api";

//* Adding Enhancer instead of just middleware because when I tried to add middleware, taskMiddleware override the type of Action
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cities: citiesSlice,
    city,
    keplerGl,
    auth,
    bopView,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
      .prepend(listenerMiddleware.middleware)
      .prepend(api.middleware)
      .concat(taskMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default store;
