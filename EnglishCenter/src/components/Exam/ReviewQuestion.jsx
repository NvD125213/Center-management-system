import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import PropTypes from "prop-types";

const ReviewQuestion = ({
  question,
  groupQuestions,
  part,
  showAllQuestions,
}) => {
  const renderQuestion = (q) => {
    const isGroupQuestion = showAllQuestions && groupQuestions.length > 1;
    const currentQuestion = isGroupQuestion ? q : question;

    return (
      <Box key={currentQuestion.id} sx={{ mb: 4 }}>
        {isGroupQuestion && (
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Câu {currentQuestion.global_order}
          </Typography>
        )}
        <Typography variant="body1" gutterBottom>
          {currentQuestion.question}
        </Typography>
        {currentQuestion.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {currentQuestion.description}
          </Typography>
        )}

        <FormControl component="fieldset" sx={{ mt: 2, width: "100%" }}>
          <RadioGroup value={currentQuestion.selectedOption} disabled>
            {Object.entries(currentQuestion.options || {}).map(
              ([key, value]) => {
                const isSelected = currentQuestion.selectedOption === key;
                const isCorrect = currentQuestion.correctOption === key;
                const showCorrect = isCorrect;
                const showWrong = isSelected && !isCorrect;

                return (
                  <Paper
                    key={key}
                    elevation={0}
                    sx={{
                      p: 1,
                      mb: 1,
                      border: 1,
                      borderColor: showCorrect
                        ? "success.main"
                        : showWrong
                        ? "error.main"
                        : "divider",
                      bgcolor: showCorrect
                        ? "success.main"
                        : showWrong
                        ? "error.light"
                        : "background.paper",
                    }}>
                    <FormControlLabel
                      value={key}
                      control={
                        <Radio
                          checked={isSelected}
                          disabled
                          sx={{
                            color:
                              showCorrect || showWrong
                                ? "white"
                                : "primary.main",
                            "&.Mui-checked": {
                              color:
                                showCorrect || showWrong
                                  ? "white"
                                  : "primary.main",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography
                          sx={{
                            color:
                              showCorrect || showWrong
                                ? "white"
                                : "text.primary",
                            fontWeight:
                              showCorrect || showWrong ? "bold" : "normal",
                          }}>
                          {value}
                        </Typography>
                      }
                      sx={{ width: "100%", m: 0 }}
                    />
                  </Paper>
                );
              }
            )}
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {showAllQuestions
          ? `Part ${part} - Nhóm câu hỏi`
          : `Câu ${question.global_order}`}
      </Typography>
      {showAllQuestions
        ? groupQuestions.map((q) => renderQuestion(q))
        : renderQuestion(question)}
    </Box>
  );
};

ReviewQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    global_order: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    description: PropTypes.string,
    options: PropTypes.object.isRequired,
    selectedOption: PropTypes.string,
    correctOption: PropTypes.string.isRequired,
  }).isRequired,
  groupQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      global_order: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      description: PropTypes.string,
      options: PropTypes.object.isRequired,
      selectedOption: PropTypes.string,
      correctOption: PropTypes.string.isRequired,
    })
  ).isRequired,
  part: PropTypes.string.isRequired,
  showAllQuestions: PropTypes.bool,
};

export default ReviewQuestion;
