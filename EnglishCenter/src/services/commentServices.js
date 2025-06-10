import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => ({
        url: "/comment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Comment"],
    }),
    getComments: builder.query({
      query: (examId) => ({
        url: `/comment/${examId}`,
      }),
      providesTags: ["Comment"],
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsQuery } = commentApi;
