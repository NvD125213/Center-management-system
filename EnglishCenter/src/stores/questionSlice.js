import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  answers: {}, // Lưu trữ câu trả lời theo format: { questionId: selectedAnswer }
  currentQuestionId: null, // ID của câu hỏi hiện tại
  examId: null, // Thêm examId để quản lý state theo từng bài thi
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      // Chỉ cập nhật nếu có questionId hợp lệ
      if (questionId) {
        // Đảm bảo questionId là number
        const normalizedQuestionId = Number(questionId);
        // Xóa câu trả lời cũ của câu hỏi này nếu có
        if (state.answers[normalizedQuestionId]) {
          delete state.answers[normalizedQuestionId];
        }
        // Thêm câu trả lời mới
        state.answers[normalizedQuestionId] = answer;
      }
    },
    setCurrentQuestion: (state, action) => {
      if (action.payload) {
        state.currentQuestionId = Number(action.payload);
      }
    },
    setExamId: (state, action) => {
      state.examId = action.payload;
    },
    clearAnswers: (state) => {
      state.answers = {};
      state.currentQuestionId = null;
    },
    resetExamState: (state) => {
      state.answers = {};
      state.currentQuestionId = null;
      state.examId = null;
    },
  },
});

export const {
  setAnswer,
  setCurrentQuestion,
  clearAnswers,
  setExamId,
  resetExamState,
} = questionSlice.actions;

// Selectors
export const selectAnswer = (state, questionId) =>
  state.question.answers[Number(questionId)];
export const selectCurrentQuestion = (state) =>
  state.question.currentQuestionId;
export const selectAllAnswers = (state) => state.question.answers;
export const selectExamId = (state) => state.question.examId;

export default questionSlice.reducer;
