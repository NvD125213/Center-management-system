import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include", // This is important for cookies
  prepareHeaders: (headers) => {
    // Get the token from cookies
    const token = Cookies.get("access_token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Create a custom base query that handles token refresh
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 and we haven't tried to refresh the token yet
  if (result.error?.status === 401) {
    // Try to get a new token
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken: Cookies.get("refresh_token") },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      Cookies.set("access_token", refreshResult.data.access_token);
      if (refreshResult.data.refresh_token) {
        Cookies.set("refresh_token", refreshResult.data.refresh_token);
      }
      result = await baseQuery(args, api, extraOptions);
    } else {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    }
  }

  return result;
};
