import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: ({ user_id, exam_id }) => ({
        url: `/history/exam-history/${user_id}/${exam_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHistoryQuery } = historyApi;
