import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const questionApi = createApi({
  reducerPath: "questionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    getAllQuestionsOnExam: builder.query({
      // exam_id có thể là 1 số, 1 mảng số, hoặc chuỗi phân cách bằng dấu phẩy
      query: (exam_id) => {
        let examIdsParam = Array.isArray(exam_id) ? exam_id.join(",") : exam_id;
        return {
          url: `/question/getAllQuestionOnExam/${examIdsParam}`,
          method: "GET",
        };
      },
      providesTags: ["Question"],
    }),
  }),
});

export const { useGetAllQuestionsOnExamQuery } = questionApi;
