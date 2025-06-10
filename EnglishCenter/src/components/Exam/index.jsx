import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Backdrop,
  Button,
  Stack,
} from "@mui/material";
import DetailElement from "./DetailElement";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DetailQuestion from "./DetailQuestion";
import { useGetAllQuestionsOnExamQuery } from "../../services/questionServices";
import { setExamId, resetExamState } from "../../stores/questionSlice";

const DetailExam = () => {
  const dispatch = useDispatch();
  const { part: partId, group: groupId, question: questionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { examId, examTime, startTime } = location.state || {};
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [currentPart, setCurrentPart] = useState(null);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [hasGroupElements, setHasGroupElements] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // Always fetch questions when component mounts and we have examId
  const {
    data: examQuestions,
    isLoading,
    error,
  } = useGetAllQuestionsOnExamQuery(examId, {
    skip: !examId,
  });

  // Update isInitialLoad based on query loading state
  useEffect(() => {
    if (!isLoading && examQuestions) {
      setIsInitialLoad(false);
    }
  }, [isLoading, examQuestions]);

  // Reset exam state when component mounts or examId changes
  useEffect(() => {
    if (examId) {
      dispatch(setExamId(examId));
    }
    return () => {
      dispatch(resetExamState());
    };
  }, [dispatch, examId]);

  // Validate examId
  useEffect(() => {
    if (!examId) {
      navigate("/test-online", { replace: true });
    }
  }, [examId, navigate]);

  useEffect(() => {
    if (!location.state || !examId) {
      navigate("/", { replace: true });
    }
  }, [location.state, examId, navigate]);

  useEffect(() => {
    if (examQuestions && partId) {
      const idx = examQuestions.findIndex(
        (p) => String(p.part) === String(partId)
      );
      if (idx !== -1) setCurrentPartIndex(idx);
    }
  }, [examQuestions, partId]);

  // Handle initial navigation when we have questions data
  useEffect(() => {
    const shouldNavigate =
      !isNavigating &&
      !isLoading &&
      examQuestions &&
      (!partId || !groupId || !questionId);

    if (shouldNavigate) {
      setIsNavigating(true);
      const firstPart = examQuestions[0];
      if (firstPart?.data?.length > 0) {
        const firstGroup = firstPart.data[0];
        if (firstGroup?.questions?.length > 0) {
          const firstQuestion = firstGroup.questions[0];
          navigate(
            `/test-online/detail/${firstPart.part}/${firstGroup.id}/${firstQuestion.id}`,
            {
              replace: true,
              state: { ...location.state, examId },
            }
          );
        }
      }
      setIsNavigating(false);
    }
  }, [
    isNavigating,
    isLoading,
    examQuestions,
    partId,
    groupId,
    questionId,
    navigate,
    location.state,
    examId,
  ]);

  // Find question info when params change
  useEffect(() => {
    if (partId && groupId && questionId && examQuestions) {
      const info = findQuestionInfo(partId, groupId, questionId);
      if (info) {
        setCurrentPart(info.part);
        setCurrentGroup(info.group);
        setCurrentQuestion(info.question);
        setHasGroupElements(info.group.elements?.length > 0);
      } else if (!isInitialLoad) {
        // If question not found and not in initial load, navigate to first question
        const firstPart = examQuestions[0];
        if (firstPart?.data?.length > 0) {
          const firstGroup = firstPart.data[0];
          if (firstGroup?.questions?.length > 0) {
            const firstQuestion = firstGroup.questions[0];
            navigate(
              `/test-online/detail/${firstPart.part}/${firstGroup.id}/${firstQuestion.id}`,
              {
                replace: true,
                state: { ...location.state, examId },
              }
            );
          }
        }
      }
    }
  }, [
    partId,
    groupId,
    questionId,
    examQuestions,
    navigate,
    location.state,
    isInitialLoad,
    examId,
  ]);

  // Kiểm tra thời gian làm bài
  useEffect(() => {
    if (examTime && startTime) {
      const checkTime = () => {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000 / 60; // Convert to minutes
        if (elapsedTime >= examTime) {
          // TODO: Handle exam timeout
          console.log("Exam time is up!");
        }
      };

      const timer = setInterval(checkTime, 1000);
      return () => clearInterval(timer);
    }
  }, [examTime, startTime]);

  // Nếu không có examId hoặc không có state, redirect về trang home
  useEffect(() => {
    if (!location.state || !examId) {
      navigate("/", { replace: true });
    }
  }, [location.state, examId, navigate]);

  // Nếu không có state hoặc examId, không render gì cả (tránh loading)
  if (!location.state || !examId) return null;

  // Hàm để tìm thông tin câu hỏi
  const findQuestionInfo = (partId, groupId, questionId) => {
    if (!examQuestions) return null;

    const part = examQuestions.find((p) => String(p.part) === String(partId));
    if (!part || !part.data) {
      console.warn(`Part ${partId} not found or has no data`);
      return null;
    }

    // Lấy nhóm đầu tiên vì chúng ta đã gộp tất cả câu hỏi vào một nhóm
    const group = part.data.find((g) => String(g.id) === String(groupId));
    const question = group.questions.find(
      (q) => String(q.id) === String(questionId)
    );

    if (!question) {
      console.warn(`Question ${questionId} not found in Part ${partId}`);
      return null;
    }

    const groupHasElements = group.elements && group.elements.length > 0;
    setHasGroupElements(groupHasElements);

    const validatedQuestion = {
      ...question,
      id: question.id,
      global_order: question.global_order || 0,
      question: question.title,
      choices: question.option ? Object.values(question.option) : [],
      elements: Array.isArray(question.elements) ? question.elements : [],
    };

    const groupQuestions = groupHasElements
      ? group.questions.map((q) => ({
          ...q,
          id: q.id,
          global_order: q.global_order || 0,
          question: q.title,
          choices: q.option ? Object.values(q.option) : [],
          elements: Array.isArray(q.elements) ? q.elements : [],
        }))
      : [validatedQuestion];

    return {
      part,
      group: {
        ...group,
        questions: groupQuestions,
      },
      question: validatedQuestion,
    };
  };

  if (isLoading || isInitialLoad) {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        }}
        open={true}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}>
          <CircularProgress color="inherit" />
          <Typography variant="h6">
            {isInitialLoad ? "Đang chuẩn bị bài thi..." : "Đang tải câu hỏi..."}
          </Typography>
          {!examId && (
            <Typography variant="body2" color="error">
              Không tìm thấy thông tin bài thi. Vui lòng thử lại.
            </Typography>
          )}
        </Box>
      </Backdrop>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center", width: "100%" }}>
        <Typography variant="h6" color="error">
          Lỗi khi tải bài thi: {error.message}
        </Typography>
      </Box>
    );
  }

  if (!currentPart || !currentGroup || !currentQuestion) {
    return (
      <Box sx={{ p: 3, textAlign: "center", width: "100%" }}>
        <Typography variant="h6" color="text.secondary">
          Question not found
        </Typography>
      </Box>
    );
  }

  const getAllQuestionsFlat = (examQuestions) => {
    if (!examQuestions) return [];
    const flat = [];
    examQuestions.forEach((part) => {
      part.data.forEach((group) => {
        group.questions.forEach((question) => {
          flat.push({
            partId: part.part,
            groupId: group.id,
            questionId: question.id,
          });
        });
      });
    });
    return flat;
  };

  const allQuestionsFlat = getAllQuestionsFlat(examQuestions);
  const currentIndex = allQuestionsFlat.findIndex(
    (q) =>
      String(q.partId) === String(partId) &&
      String(q.groupId) === String(groupId) &&
      String(q.questionId) === String(questionId)
  );

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      const prev = allQuestionsFlat[currentIndex - 1];
      navigate(
        `/test-online/detail/${prev.partId}/${prev.groupId}/${prev.questionId}`,
        {
          replace: true,
          state: { ...location.state, examId },
        }
      );
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < allQuestionsFlat.length - 1) {
      const next = allQuestionsFlat[currentIndex + 1];
      navigate(
        `/test-online/detail/${next.partId}/${next.groupId}/${next.questionId}`,
        {
          replace: true,
          state: { ...location.state, examId },
        }
      );
    }
  };

  const handleFinish = () => {
    // TODO: Replace with real finish logic
    alert("Finish exam!");
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          display: "flex",
        }}>
        {/* Left side - Elements */}
        <Box
          sx={{
            width: "40%",
            height: "100%",
            borderRight: "1px solid",
            borderColor: "divider",
            overflow: "auto",
            boxSizing: "border-box",
            "@media (max-width: 900px)": {
              width: "100%",
              display: hasGroupElements ? "block" : "none",
            },
          }}>
          <Paper
            elevation={0}
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: 0,
              p: 3,
              boxSizing: "border-box",
            }}>
            {hasGroupElements ? (
              <DetailElement
                elements={currentGroup.elements}
                title={`Part ${currentPart.part} - Group Elements`}
              />
            ) : (
              currentQuestion.elements &&
              currentQuestion.elements.length > 0 && (
                <DetailElement
                  elements={currentQuestion.elements}
                  title={`Question ${currentQuestion.global_order} Elements`}
                />
              )
            )}
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ArrowBackIcon />}
                onClick={handlePrevQuestion}
                disabled={currentIndex === 0}>
                Prev
              </Button>
              {currentIndex === allQuestionsFlat.length - 1 ? (
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<CheckCircleIcon />}
                  onClick={handleFinish}>
                  Finish
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleNextQuestion}
                  disabled={currentIndex === allQuestionsFlat.length - 1}>
                  Next
                </Button>
              )}
            </Stack>
          </Paper>
        </Box>

        {/* Right side - Questions */}
        <Box
          sx={{
            width: "60%",
            height: "100%",
            overflow: "auto",
            bgcolor: "background.default",
            boxSizing: "border-box",
            "@media (max-width: 900px)": {
              width: "100%",
            },
          }}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              p: 3,
              boxSizing: "border-box",
            }}>
            {currentQuestion && (
              <DetailQuestion
                key={`question-${currentQuestion.id}`}
                question={currentQuestion}
                groupQuestions={currentGroup.questions}
                part={currentPart.part}
                showAllQuestions={hasGroupElements}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailExam;
