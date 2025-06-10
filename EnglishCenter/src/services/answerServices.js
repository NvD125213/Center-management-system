import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const answerApi = createApi({
  reducerPath: "answerApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Answer"],
  endpoints: (builder) => ({
    submitAnswer: builder.mutation({
      query: (data) => ({
        url: "/answer/submit-exam",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Answer"],
    }),
  }),
});

export const { useSubmitAnswerMutation } = answerApi;
