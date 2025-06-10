import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Backdrop,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReviewQuestion from "./ReviewQuestion";

const ExamHistoryDetail = ({ open, onClose, examData, examName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentPart, setCurrentPart] = useState(null);
  const [hasGroupElements, setHasGroupElements] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [flattenedQuestions, setFlattenedQuestions] = useState([]);

  // Flatten questions and add submission data when component mounts or data changes
  useEffect(() => {
    if (examData?.questions && examData?.exam_history?.length > 0) {
      const submissionTime = examData.exam_history[0].submitted_at;
      const flattened = examData.questions.flatMap((part) =>
        part.data.flatMap((group) =>
          group.questions.map((question) => {
            const answer = question.answers?.find(
              (a) => a.submitted_at === submissionTime
            );
            return {
              ...question,
              id: question.id,
              global_order: question.global_order,
              question: question.title,
              description: question.description,
              options: question.option,
              part: part.part,
              group_id: group.id,
              selectedOption: answer?.selected_option,
              correctOption: question.correct_option,
              isCorrect: answer?.is_correct,
            };
          })
        )
      );
      setFlattenedQuestions(flattened);
      setSelectedSubmission(submissionTime);
    }
  }, [examData]);

  const handleSubmissionChange = (event) => {
    const newSubmissionTime = event.target.value;
    setSelectedSubmission(newSubmissionTime);

    // Update flattened questions with new submission data
    const updatedQuestions = examData.questions.flatMap((part) =>
      part.data.flatMap((group) =>
        group.questions.map((question) => {
          const answer = question.answers?.find(
            (a) => a.submitted_at === newSubmissionTime
          );
          return {
            ...question,
            id: question.id,
            global_order: question.global_order,
            question: question.title,
            description: question.description,
            options: question.option,
            part: part.part,
            group_id: group.id,
            selectedOption: answer?.selected_option,
            correctOption: question.correct_option,
            isCorrect: answer?.is_correct,
          };
        })
      )
    );
    setFlattenedQuestions(updatedQuestions);
    setCurrentQuestion(null);
  };

  const handleQuestionClick = (questionId) => {
    const question = flattenedQuestions.find((q) => q.id === questionId);
    if (question) {
      const part = examData.questions.find((p) => p.part === question.part);
      const group = part.data.find((g) => g.id === question.group_id);

      // Map group questions to match ReviewQuestion prop types
      const mappedGroupQuestions = group.questions.map((q) => {
        const answer = q.answers?.find(
          (a) => a.submitted_at === selectedSubmission
        );
        return {
          ...q,
          id: q.id,
          global_order: q.global_order,
          question: q.title,
          description: q.description,
          options: q.option,
          selectedOption: answer?.selected_option,
          correctOption: q.correct_option,
          isCorrect: answer?.is_correct,
        };
      });

      setCurrentPart(part);
      setCurrentGroup({
        ...group,
        questions: mappedGroupQuestions,
      });
      setCurrentQuestion(question);
      setHasGroupElements(group.elements && group.elements.length > 0);
    }
  };

  if (!open) return null;

  // Find the selected submission details
  const selectedHistory = examData?.exam_history?.find(
    (history) => history.submitted_at === selectedSubmission
  );

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      }}
      open={open}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          color: "text.primary",
        }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: 1,
            borderColor: "divider",
          }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6">{examName}</Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Lần làm bài</InputLabel>
              <Select
                value={selectedSubmission || ""}
                onChange={handleSubmissionChange}
                label="Lần làm bài">
                {examData?.exam_history?.map((history) => (
                  <MenuItem
                    key={history.submitted_at}
                    value={history.submitted_at}>
                    {new Date(history.submitted_at).toLocaleString()} - Điểm:{" "}
                    {history.total_score}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <IconButton onClick={onClose} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Submission Summary */}
        {selectedHistory && (
          <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="subtitle1" gutterBottom>
              Tổng kết bài làm:
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Typography>
                Tổng số câu: <strong>{selectedHistory.total_questions}</strong>
              </Typography>
              <Typography>
                Số câu đúng: <strong>{selectedHistory.correct_answers}</strong>
              </Typography>
              <Typography>
                Điểm số: <strong>{selectedHistory.total_score}</strong>
              </Typography>
            </Box>
          </Box>
        )}

        {/* Content */}
        <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Left side - Question navigation */}
          <Box
            sx={{
              width: "300px",
              borderRight: 1,
              borderColor: "divider",
              p: 2,
              overflow: "auto",
            }}>
            <Typography variant="subtitle1" gutterBottom>
              Danh sách câu hỏi
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {flattenedQuestions.map((question) => (
                <Chip
                  key={question.id}
                  label={`Câu ${question.global_order}`}
                  onClick={() => handleQuestionClick(question.id)}
                  color={question.isCorrect ? "success" : "error"}
                  variant="outlined"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: question.isCorrect
                        ? "success.light"
                        : "error.light",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Right side - Question detail */}
          <Box sx={{ flex: 1, p: 3, overflow: "auto" }}>
            {currentQuestion ? (
              <ReviewQuestion
                question={currentQuestion}
                groupQuestions={currentGroup?.questions || []}
                part={currentPart?.part}
                showAllQuestions={hasGroupElements}
              />
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}>
                <Typography variant="h6" color="text.secondary">
                  Chọn câu hỏi để xem chi tiết
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Backdrop>
  );
};

ExamHistoryDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  examData: PropTypes.shape({
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        part: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            questions: PropTypes.arrayOf(
              PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                description: PropTypes.string,
                global_order: PropTypes.number.isRequired,
                correct_option: PropTypes.string.isRequired,
                option: PropTypes.object.isRequired,
                elements: PropTypes.array,
                answers: PropTypes.arrayOf(
                  PropTypes.shape({
                    selected_option: PropTypes.string,
                    is_correct: PropTypes.bool.isRequired,
                    submitted_at: PropTypes.string.isRequired,
                  })
                ),
              })
            ).isRequired,
            elements: PropTypes.array,
          })
        ).isRequired,
      })
    ).isRequired,
    exam_history: PropTypes.arrayOf(
      PropTypes.shape({
        submitted_at: PropTypes.string.isRequired,
        total_questions: PropTypes.number.isRequired,
        correct_answers: PropTypes.number.isRequired,
        total_score: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  examName: PropTypes.string.isRequired,
};

export default ExamHistoryDetail;
