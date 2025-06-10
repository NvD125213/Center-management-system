import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";

export const aiServices = createApi({
  reducerPath: "aiServices",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    askAiAgent: builder.mutation({
      query: (data) => ({
        url: "/ai/ai-agent",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAskAiAgentMutation } = aiServices;
