import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import { setAnswer, setCurrentQuestion } from "../../stores/questionSlice";

// Định nghĩa các giá trị Option hợp lệ
const VALID_OPTIONS = ["A", "B", "C", "D"];

const DetailQuestion = ({ question, groupQuestions, showAllQuestions }) => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.question.answers);

  // Set current question when component mounts or question changes
  useEffect(() => {
    if (question?.id) {
      dispatch(setCurrentQuestion(question.id));
    }
  }, [dispatch, question?.id]);

  const handleAnswerChange = useCallback(
    (questionId, answer) => {
      // Kiểm tra xem answer có phải là một trong các giá trị Option hợp lệ không
      if (questionId && VALID_OPTIONS.includes(answer)) {
        const normalizedQuestionId = Number(questionId);
        const currentAnswer = answers[normalizedQuestionId];

        if (currentAnswer !== answer) {
          dispatch(setAnswer({ questionId: normalizedQuestionId, answer }));
        }
      }
    },
    [dispatch, answers]
  );

  if (!question || !groupQuestions) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No question data available
        </Typography>
      </Box>
    );
  }

  // Render single question
  const renderQuestion = (q) => {
    const questionAnswer = answers[Number(q.id)] || "";

    return (
      <Paper
        key={`paper-${q.id}`}
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          bgcolor:
            Number(q.id) === Number(question.id)
              ? "action.hover"
              : "background.paper",
        }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Question {q.global_order}
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {q.title}
        </Typography>

        {q.option ? (
          <RadioGroup
            name={`question-${q.id}`}
            value={questionAnswer}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}>
            {Object.entries(q.option).map(([key, value]) => (
              <FormControlLabel
                key={`${q.id}-choice-${key}`}
                value={key}
                control={<Radio />}
                label={value}
                sx={{
                  mb: 1,
                  p: 1,
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              />
            ))}
          </RadioGroup>
        ) : (
          <Typography color="text.secondary">
            No choices available for this question
          </Typography>
        )}
      </Paper>
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
      }}>
      {showAllQuestions
        ? groupQuestions.map((q) => renderQuestion(q))
        : renderQuestion(question)}
    </Box>
  );
};

DetailQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    global_order: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    option: PropTypes.object,
  }).isRequired,
  groupQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      global_order: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      option: PropTypes.object,
    })
  ).isRequired,
  part: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  showAllQuestions: PropTypes.bool.isRequired,
};

export default DetailQuestion;
