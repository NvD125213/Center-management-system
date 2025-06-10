import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAllAddress: builder.query({
      query: ({ page = 1, limit = 10 }) => {
        return {
          url: "/address",
          params: { page, limit },
        };
      },
      providesTags: ["Address"],
    }),

    getClassByAddressAndMonth: builder.query({
      query: ({
        address_id,
        year = new Date().getFullYear(),
        month = new Date().getMonth() + 1,
      }) => {
        return {
          url: `/class/get-class-by-address-and-month`,
          params: { address_id, year, month },
        };
      },
    }),
  }),
});

export const { useGetAllAddressQuery, useGetClassByAddressAndMonthQuery } =
  addressApi;
