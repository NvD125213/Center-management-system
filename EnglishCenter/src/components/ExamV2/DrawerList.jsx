import { Typography, Box, Button, Stack, Divider } from "@mui/material";
import { useRef, useEffect } from "react";
import mockEnglishQuestions from "../../mocks/listQuestion";
import PropTypes from "prop-types";

// Demo giả định trạng thái đã trả lời
const mockUserAnswers = {
  2: "A",
  3: "C",
  5: "B",
  6: "D",
};

const DrawerList = ({ onSelectQuestion, selectedQuestionId }) => {
  const questionRefs = useRef({});

  // Lấy flat danh sách tất cả câu hỏi (kèm theo part)
  const flatQuestions = mockEnglishQuestions.flatMap((part) =>
    part.data.flatMap((group) =>
      group.questions.map((q) => ({
        ...q,
        part: part.part,
      }))
    )
  );

  // Thay thế partIndexes để lưu id câu hỏi thay vì global_order
  const partIndexes = mockEnglishQuestions.reduce((acc, part) => {
    const ids = part.data.flatMap((group) => group.questions.map((q) => q.id));
    acc[`Part ${part.part}`] = ids;
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
  return (
    <Box sx={{ height: "100%", overflow: "auto", px: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Danh sách câu hỏi
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {Object.entries(partIndexes).map(([partTitle, indexList]) => (
        <Box key={partTitle} sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {partTitle}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {indexList.map((questionId) => {
              const question = flatQuestions.find((q) => q.id === questionId);
              if (!question) return null;

              const isSelected = question.id === selectedQuestionId;
              const isAnswered = !!mockUserAnswers[questionId];

              return (
                <Button
                  key={questionId}
                  variant="outlined"
                  size="small"
                  ref={(el) => (questionRefs.current[questionId] = el)}
                  onClick={() => handleQuestionClick(questionId)}
                  sx={{
                    minWidth: 36,
                    height: 36,
                    px: 0,
                    bgcolor: isSelected
                      ? "#c8e6c9"
                      : isAnswered
                      ? "#ffcdd2"
                      : "#fff",
                    borderColor: isAnswered || isSelected ? "red" : "#ccc",
                    color: "#000",
                    fontWeight: 600,
                    "&:hover": {
                      bgcolor: isSelected
                        ? "#a5d6a7"
                        : isAnswered
                        ? "#ef9a9a"
                        : "#f5f5f5",
                    },
                  }}>
                  {question.global_order}
                </Button>
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
};

export default DrawerList;
