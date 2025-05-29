import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getMenus: builder.query({
      query: (params) => ({
        url: "/menu",
        method: "GET",
        params,
      }),
      providesTags: ["Menu"],
    }),
    getMenuById: builder.query({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Menu", id }],
    }),
  }),
});

export const { useGetMenusQuery, useGetMenuByIdQuery } = menuApi;
