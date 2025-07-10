import {
  Box,
  Typography,
  Grid,
  Stack,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import mockEnglishQuestions from "../../mocks/listQuestion";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

const ViewList = ({ onSelectQuestion, selectedQuestionId }) => {
  const [selectedPart, setSelectedPart] = useState(null); // ban đầu chưa chọn
  const questionRefs = useRef({});

  useEffect(() => {
    if (selectedQuestionId && questionRefs.current[selectedQuestionId]) {
      questionRefs.current[selectedQuestionId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedQuestionId]);

  // Tự động chuyển part khi selectedQuestionId đổi
  useEffect(() => {
    if (selectedQuestionId) {
      const foundPart = mockEnglishQuestions.find((part) =>
        part.data.some((group) =>
          group.questions.some((q) => q.id === selectedQuestionId)
        )
      );
      if (foundPart && foundPart.part !== selectedPart) {
        setSelectedPart(foundPart.part);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuestionId]);

  const availableParts = mockEnglishQuestions.map((p) => p.part);

  const currentPartData = mockEnglishQuestions.find(
    (p) => p.part === selectedPart
  );

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Danh sách câu hỏi
      </Typography>

      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        {availableParts.map((part) => (
          <Button
            key={part}
            variant={part === selectedPart ? "contained" : "outlined"}
            onClick={() => setSelectedPart(part)}>
            Part {part}
          </Button>
        ))}
      </Stack>

      {selectedPart === null ? (
        <Typography variant="body1">Vui lòng chọn một Part.</Typography>
      ) : !currentPartData ? (
        <Typography variant="body1">Không có dữ liệu cho Part này.</Typography>
      ) : (
        <Box key={currentPartData.part} sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Part {currentPartData.part}
          </Typography>

          {currentPartData.data.map((group) => {
            const hasElements = group.elements && group.elements.length > 0;

            return (
              <Box key={group.id} sx={{ mb: 4 }}>
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
                                src={el.url}
                                style={{ width: "100%" }}
                              />
                            ) : el.type === "image" ? (
                              <img
                                key={el.id}
                                src={el.url}
                                alt="group element"
                                style={{
                                  width: "100%",
                                  borderRadius: 4,
                                  maxHeight: 300,
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
                        flex: hasElements ? 3 : 1, // full width if no element
                        width: hasElements ? "auto" : "100%", // force full width when no element
                        maxHeight: 600,
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
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              mb={1}>
                              <Typography fontWeight="bold" fontSize="inherit">
                                Câu {q.global_order}: {q.title}
                              </Typography>
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => onSelectQuestion(q.id)}>
                                Xem
                              </Button>
                            </Stack>

                            <RadioGroup name={`question-${q.id}`}>
                              {Object.entries(q.option).map(([key, value]) => (
                                <FormControlLabel
                                  key={key}
                                  value={key}
                                  control={<Radio size="small" />}
                                  label={
                                    <Typography fontSize="inherit">
                                      {`${key}. ${value}`}
                                    </Typography>
                                  }
                                />
                              ))}
                            </RadioGroup>

                            {q.elements?.length > 0 && (
                              <Stack mt={2} spacing={1}>
                                {q.elements.map((el) =>
                                  el.type === "audio" ? (
                                    <audio
                                      key={el.id}
                                      controls
                                      src={el.url}
                                      style={{ width: "100%" }}
                                    />
                                  ) : el.type === "image" ? (
                                    <img
                                      key={el.id}
                                      src={el.url}
                                      alt="question element"
                                      style={{
                                        width: "100%",
                                        borderRadius: 4,
                                        maxHeight: 250,
                                        objectFit: "cover",
                                      }}
                                    />
                                  ) : null
                                )}
                              </Stack>
                            )}
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
};

export default ViewList;
