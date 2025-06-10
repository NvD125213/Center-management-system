import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const consultantApi = createApi({
  reducerPath: "consultantApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Consultant"],
  endpoints: (builder) => ({
    createConsultation: builder.mutation({
      query: (data) => ({
        url: "/consultation",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Consultant"],
    }),
  }),
});

export const { useCreateConsultationMutation, useGetAllConsultationsQuery } =
  consultantApi;
