import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const subjectApi = createApi({
  reducerPath: "subjectApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Subject"],
  endpoints: (builder) => ({
    getSubjectWithExam: builder.query({
      query: () => ({
        url: "/subject/get-subject-with-exam",
        method: "GET",
      }),
      providesTags: ["Subject"],
    }),
  }),
});

export const { useGetSubjectWithExamQuery } = subjectApi;
