import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: null,
  isAuthenticated: !!Cookies.get("access_token"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    },
  },
});

export const { setCredentials, setLoading, setError, logout } =
  authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;




































