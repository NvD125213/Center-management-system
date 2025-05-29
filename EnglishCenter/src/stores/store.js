import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authServices";
import { menuApi } from "../services/menuServices";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(menuApi.middleware),
});

export default store;
