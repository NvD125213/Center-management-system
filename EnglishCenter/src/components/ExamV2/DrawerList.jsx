import { Typography, Box, Button, Stack, Divider } from "@mui/material";
import { useRef, useEffect, useState } from "react";
// import mockEnglishQuestions from "../../mocks/listQuestion";
import { CheckCircle, Replay } from "@mui/icons-material";
import PropTypes from "prop-types";

const DrawerList = ({
  examTime = 60,
  questions,
  onSelectQuestion,
  selectedQuestionId,
  userAnswers,
  bookmarkedQuestions,
  onSubmitExam, // thêm prop mới
}) => {
  const questionRefs = useRef({});

  // Timer state: sử dụng examTime (phút) truyền vào, mặc định 60 nếu không có
  const initialSeconds = (examTime ? Number(examTime) : 60) * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    // Khi examTime thay đổi (chuyển đề, làm lại, v.v.), reset lại timer
    setSecondsLeft((examTime ? Number(examTime) : 60) * 60);
  }, [examTime]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  // Format mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Lấy flat danh sách tất cả câu hỏi (kèm theo part)
  const flatQuestions = questions.flatMap((part) =>
    part.data.flatMap((group) =>
      group.questions.map((q) => ({
        ...q,
        part: part.part,
      }))
    )
  );

  // Thay thế partIndexes để lưu id câu hỏi thay vì global_order
  const partIndexes = questions.reduce((acc, part) => {
    const ids = part.data.flatMap((group) => group.questions.map((q) => q.id));
    acc[`${part.part}`] = ids;
    return acc;
  }, {});

  // Scroll đến câu hỏi được chọn
  useEffect(() => {
    const selected = flatQuestions.find((q) => q.id === selectedQuestionId);
    if (selected && questionRefs.current[selected.global_order]) {
      questionRefs.current[selected.global_order].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedQuestionId]);

  const handleQuestionClick = (questionId) => {
    const question = flatQuestions.find((q) => q.id === questionId);
    if (question) onSelectQuestion?.(question);
  };
  const handleSubmit = () => {
    if (onSubmitExam) {
      onSubmitExam();
    }
  };

  const handleReset = () => {
    // Logic làm lại (reset câu trả lời và bookmark)
    if (window.confirm("Bạn có chắc chắn muốn làm lại?")) {
      window.location.reload(); // Đơn giản reload trang để reset
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "auto",
        px: 2,
        py: 2,
      }}>
      {/* Timer */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ mb: 2 }}
        spacing={3}>
        {/* Nút Chấm điểm */}
        <Box
          sx={{
            borderRadius: 1,
            minWidth: 80,
            cursor: "pointer",
          }}
          onClick={handleSubmit}>
          <Stack direction="column" alignItems="center" spacing={0.5}>
            <CheckCircle color="primary" fontSize="small" />
            <Typography variant="body2" fontWeight="500" color="primary.main">
              Chấm điểm
            </Typography>
          </Stack>
        </Box>

        {/* Timer */}
        <Box
          sx={{
            px: 2,
            py: 1,
            backgroundColor: secondsLeft <= 300 ? "#ffebee" : "#e8f5e8",
            border: `1px solid ${secondsLeft <= 300 ? "#f44336" : "#4caf50"}`,
            borderRadius: 1,
            minWidth: 80,
            textAlign: "center",
          }}>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            color={secondsLeft <= 300 ? "error.main" : "success.main"}
            sx={{ fontFamily: "monospace" }}>
            {formatTime(secondsLeft)}
          </Typography>
        </Box>

        {/* Nút Làm lại */}
        <Box
          sx={{
            borderRadius: 1,
            textAlign: "center",
            minWidth: 80,
            cursor: "pointer",
          }}
          onClick={handleReset}>
          <Stack direction="column" alignItems="center" spacing={0.5}>
            <Replay color="primary" fontSize="small" />
            <Typography variant="body2" fontWeight="500" color="primary.main">
              Làm lại
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* Header */}
      <Typography
        variant="h6"
        fontWeight="500"
        color="text.primary"
        gutterBottom>
        Danh sách câu hỏi
      </Typography>

      {Object.entries(partIndexes).map(([partTitle, indexList]) => (
        <Box key={partTitle} sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            fontWeight="500"
            color="primary.main"
            sx={{ mb: 1.5 }}>
            {partTitle}
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1}>
            {indexList.map((questionId) => {
              const question = flatQuestions.find((q) => q.id === questionId);
              if (!question) return null;

              const isSelected = question.id === selectedQuestionId;
              const isAnswered = !!userAnswers[questionId];
              const isBookmarked = bookmarkedQuestions.has(questionId);

              return (
                <Box
                  key={questionId}
                  sx={{ position: "relative", display: "inline-block" }}>
                  <Button
                    variant={isSelected ? "contained" : "outlined"}
                    size="small"
                    ref={(el) => (questionRefs.current[questionId] = el)}
                    onClick={() => handleQuestionClick(questionId)}
                    sx={{
                      minWidth: 38,
                      height: 38,
                      px: 0,
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      backgroundColor: isSelected
                        ? "primary.main"
                        : isAnswered
                        ? "#e8f5e8"
                        : "white",
                      borderColor: isSelected
                        ? "primary.main"
                        : isAnswered
                        ? "#4caf50"
                        : "#e0e0e0",
                      color: isSelected
                        ? "white"
                        : isAnswered
                        ? "#2e7d32"
                        : "text.primary",
                      "&:hover": {
                        backgroundColor: isSelected
                          ? "primary.dark"
                          : isAnswered
                          ? "#c8e6c9"
                          : "#f5f5f5",
                        borderColor: isSelected
                          ? "primary.dark"
                          : isAnswered
                          ? "#4caf50"
                          : "#bdbdbd",
                      },
                      transition: "all 0.2s",
                    }}>
                    {question.global_order}
                  </Button>

                  {isBookmarked && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: -6,
                        right: -6,
                        width: 16,
                        height: 16,
                        backgroundColor: "#ff9800",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: 1,
                      }}>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "10px",
                          fontWeight: "bold",
                          lineHeight: 1,
                        }}>
                        ★
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

DrawerList.propTypes = {
  onSelectQuestion: PropTypes.func,
  selectedQuestionId: PropTypes.number,
  userAnswers: PropTypes.object.isRequired,
  bookmarkedQuestions: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  examTime: PropTypes.number.isRequired,
  onSubmitExam: PropTypes.func, // Thêm propTypes cho onSubmitExam
};

export default DrawerList;
