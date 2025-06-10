import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogForMenu: builder.query({
      query: ({ slug, page = 1, limit = 10 }) => {
        return {
          url: `/blog/menu/${slug}`,
          params: { page, limit },
        };
      },
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query({
      query: (id) => `/blog/${id}`,
      providesTags: ["Blog"],
    }),
    getTopViewed: builder.query({
      query: () => `/blog/top/viewed`,
      providesTags: ["Blog"],
    }),
    getRecentBlog: builder.query({
      query: () => `/blog/recent`,
      providesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogForMenuQuery,
  useGetBlogByIdQuery,
  useGetTopViewedQuery,
  useGetRecentBlogQuery,
} = blogApi;
