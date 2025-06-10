import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    getAllQuestionsOnExam: builder.query({
      query: (examId) => ({
        url: `/question/getAllQuestionOnExam/${examId}`,
        method: "GET",
      }),
      providesTags: ["Question"],
    }),
  }),
});

export const { useGetAllQuestionsOnExamQuery } = questionApi;
