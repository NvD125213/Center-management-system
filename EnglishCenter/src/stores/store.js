import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authServices";
import { menuApi } from "../services/menuServices";
import { subjectApi } from "../services/subjectServices";
import { questionApi } from "../services/questionServices";
import { answerApi } from "../services/answerServices";
import { historyApi } from "../services/historyServices";
import { blogApi } from "../services/blogServices";
import { commentApi } from "../services/commentServices";
import { addressApi } from "../services/addressServices";
import { consultantApi } from "../services/consultantServices";
import { aiServices } from "../services/aiServices";
import authReducer from "./authSlice";
import questionReducer from "./questionSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [subjectApi.reducerPath]: subjectApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [answerApi.reducerPath]: answerApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [addressApi.reducerPath]: addressApi.reducer,
    [consultantApi.reducerPath]: consultantApi.reducer,
    [aiServices.reducerPath]: aiServices.reducer,
    auth: authReducer,
    question: questionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(menuApi.middleware)
      .concat(subjectApi.middleware)
      .concat(questionApi.middleware)
      .concat(answerApi.middleware)
      .concat(historyApi.middleware)
      .concat(blogApi.middleware)
      .concat(commentApi.middleware)
      .concat(addressApi.middleware)
      .concat(consultantApi.middleware)
      .concat(aiServices.middleware),
});

export default store;
