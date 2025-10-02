import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
// import mockEnglishQuestions from "../../mocks/listQuestion";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

const ViewList = ({
  questions,
  examName,
  selectedQuestionId,
  userAnswers,
  onAnswerChange,
  bookmarkedQuestions,
  onBookmarkToggle,
}) => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [isPartChangeFromButton, setIsPartChangeFromButton] = useState(false);
  const questionRefs = useRef({});
  const groupRefs = useRef({});

  const availableParts = questions.map((p) => p.part);
  const currentPartData = questions.find((p) => p.part === selectedPart);

  // Khi vào lần đầu, chọn Part 1
  useEffect(() => {
    if (selectedPart === null && availableParts.length > 0) {
      setSelectedPart(availableParts[0]);
    }
  }, [availableParts, selectedPart]);

  // Khi chọn Part mới bằng nút, scroll tới group đầu tiên của part
  useEffect(() => {
    if (!selectedPart || !isPartChangeFromButton) return;

    const firstGroupId = currentPartData?.data?.[0]?.id;
    if (firstGroupId && groupRefs.current[firstGroupId]) {
      const timeout = setTimeout(() => {
        groupRefs.current[firstGroupId].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setIsPartChangeFromButton(false); // Reset flag
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [selectedPart, currentPartData, isPartChangeFromButton]);

  // Khi selectedQuestionId thay đổi, scroll tới câu hỏi
  useEffect(() => {
    if (!selectedQuestionId) return;

    // Tự động chuyển Part nếu câu hỏi thuộc part khác
    const foundPart = questions.find((part) =>
      part.data.some((group) =>
        group.questions.some((q) => q.id === selectedQuestionId)
      )
    );

    if (foundPart && foundPart.part !== selectedPart) {
      setSelectedPart(foundPart.part);
    }

    // Scroll đến câu hỏi sau khi Part đã được set
    const timeout = setTimeout(
      () => {
        const elQuestion = questionRefs.current[selectedQuestionId];
        const elGroup = groupRefs.current[selectedQuestionId];

        if (elQuestion) {
          elQuestion.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (elGroup) {
          elGroup.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      },
      foundPart && foundPart.part !== selectedPart ? 200 : 50
    );

    return () => clearTimeout(timeout);
  }, [selectedQuestionId, selectedPart]);

  const getFullUrl = (el) => {
    if (el.cloudId) {
      return el.url; // Nếu lưu trên Cloud => dùng trực tiếp
    }
    return `${el.url}`; // Nếu không thì prefix domain
  };
  // Ẩn nội dung câu hỏi và đáp án nếu part là 1 hoặc 2

  const hideContent = selectedPart == "Part 1" || selectedPart == "Part 2";

  return (
    <Box sx={{ px: 2 }}>
      <Box
        sx={{
          boxShadow: "0px 2px rgba(0,0,0,0.1)", // tạo bóng nhẹ
          px: 2,
          py: 1.5,
          top: -16,
          backgroundColor: "#f5f5f5",
          zIndex: 100,
          position: "sticky",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography
          variant="h6"
          fontWeight="600"
          color="primary.main"
          textTransform="uppercase">
          {examName || "Toeic Test 2025 - Full 7 Parts"}
        </Typography>

        <Typography
          variant="h6"
          fontWeight="600"
          textTransform="uppercase"
          color="primary.main">
          {currentPartData ? `${currentPartData.part}` : ""}
        </Typography>
      </Box>

      {/* Chừa khoảng trống bên dưới để tránh content bị che bởi header */}
      <Box sx={{ height: 20 }} />

      {!currentPartData ? (
        <Typography variant="body1">Không có dữ liệu cho Part này.</Typography>
      ) : (
        <Box key={currentPartData.part} sx={{ mb: 4 }}>
          {currentPartData.data.map((group) => {
            const hasElements = group.elements && group.elements.length > 0;
            return (
              <Box
                key={group.id}
                ref={(el) => (groupRefs.current[group.id] = el)}
                sx={{ mb: 4 }}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    flexWrap="wrap">
                    {hasElements && (
                      <Box sx={{ flex: 7 }}>
                        <Stack spacing={1}>
                          {group.elements.map((el) =>
                            el.type === "audio" ? (
                              <audio
                                key={el.id}
                                controls
                                src={getFullUrl(el)}
                                style={{ width: "100%" }}
                              />
                            ) : el.type === "image" ? (
                              <img
                                key={el.id}
                                src={getFullUrl(el)}
                                alt="group element"
                                style={{
                                  width: "100%",
                                  borderRadius: 4,
                                  objectFit: "cover",
                                }}
                              />
                            ) : null
                          )}
                        </Stack>
                      </Box>
                    )}
                    <Box
                      sx={{
                        flex: hasElements ? 3 : 1,
                        width: hasElements ? "auto" : "100%",
                        overflowY: "auto",
                        pr: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        fontSize: "0.875rem",
                      }}>
                      {group.questions.map((q) => (
                        <Card
                          key={q.id}
                          ref={(el) => (questionRefs.current[q.id] = el)}
                          variant="outlined"
                          sx={{
                            borderColor:
                              q.id === selectedQuestionId
                                ? "primary.main"
                                : "divider",
                            backgroundColor:
                              q.id === selectedQuestionId ? "#e3f2fd" : "white",
                            boxShadow: q.id === selectedQuestionId ? 2 : 0,
                            transition: "box-shadow 0.2s",
                            fontSize: "inherit",
                          }}>
                          <CardContent sx={{ fontSize: "inherit" }}>
                            <Stack mb={2} spacing={1}>
                              {q.elements?.length > 0 && (
                                <Stack mt={2} spacing={2}>
                                  {q.elements.map((el) =>
                                    el.type === "audio" ? (
                                      <audio
                                        key={el.id}
                                        controls
                                        src={getFullUrl(el)}
                                        style={{ width: "100%" }} // full width
                                      />
                                    ) : el.type === "image" ? (
                                      <img
                                        key={el.id}
                                        src={getFullUrl(el)}
                                        alt="question element"
                                        style={{
                                          width: "50%", // full width
                                          borderRadius: 8,
                                          objectFit: "contain", // giữ tỉ lệ
                                        }}
                                      />
                                    ) : null
                                  )}
                                </Stack>
                              )}
                            </Stack>

                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={1}>
                              <Typography fontWeight="bold" fontSize="inherit">
                                Câu {q.global_order}:{" "}
                                {hideContent ? "" : q.title}
                              </Typography>
                              <Tooltip
                                title={
                                  bookmarkedQuestions.has(q.id)
                                    ? "Bỏ đánh dấu"
                                    : "Đánh dấu để xem lại"
                                }>
                                <IconButton
                                  size="small"
                                  onClick={() => onBookmarkToggle(q.id)}
                                  sx={{ ml: 1 }}>
                                  {bookmarkedQuestions.has(q.id) ? (
                                    <Bookmark
                                      color="warning"
                                      fontSize="small"
                                    />
                                  ) : (
                                    <BookmarkBorder fontSize="small" />
                                  )}
                                </IconButton>
                              </Tooltip>
                            </Stack>
                            <RadioGroup
                              name={`question-${q.id}`}
                              value={userAnswers[q.id] || ""} // luôn giữ giá trị đã chọn
                              onChange={(e) => {
                                onAnswerChange(q.id, e.target.value);
                              }}>
                              {q.option &&
                                Object.entries(q.option).map(([key, value]) => (
                                  <FormControlLabel
                                    key={key}
                                    value={key}
                                    control={<Radio size="small" />}
                                    label={
                                      <Typography fontSize="inherit">
                                        {hideContent ? key : `${key}. ${value}`}
                                      </Typography>
                                    }
                                  />
                                ))}
                            </RadioGroup>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </Stack>
                </Card>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

ViewList.propTypes = {
  onSelectQuestion: PropTypes.func.isRequired,
  selectedQuestionId: PropTypes.number,
  userAnswers: PropTypes.object.isRequired,
  onAnswerChange: PropTypes.func.isRequired,
  bookmarkedQuestions: PropTypes.object.isRequired,
  onBookmarkToggle: PropTypes.func.isRequired,
  examName: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
};

export default ViewList;
