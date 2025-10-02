import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useGetAllQuestionsOnExamQuery } from "../services/questionServices";
import ViewList from "../components/ExamV2/ViewList";
import DrawerList from "../components/ExamV2/DrawerList";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useSubmitAnswerMutation } from "../services/answerServices";
import NotFound from "./NotFound";
import { toast } from "react-hot-toast";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const DetailExamV2 = () => {
  const { examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { examTime, examName, subjectName, startTime, selectedDuration } =
    location.state || {};

  const examIdNumber = examId;

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(new Set());
  const [isExamActive, setIsExamActive] = useState(true);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: examQuestions } = useGetAllQuestionsOnExamQuery(examIdNumber);
  const [submitExam, { isLoading: isSubmitting }] = useSubmitAnswerMutation();

  // useRef để lưu payload hiện thời mà không render lại component khi thay đổi
  const payloadRef = useRef({
    exam_id: Number(examIdNumber),
    answers: [],
  });

  const pendingPayloadRef = useRef(null);

  // Cảnh báo khi đóng tab, reload hoặc thoát trang
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isExamActive & (examQuestions.length > 0)) {
        e.preventDefault();
        const message =
          "Bạn đang trong quá trình làm bài thi. Nếu thoát ra, các câu trả lời chưa nộp sẽ bị mất. Bạn có chắc chắn muốn thoát?";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isExamActive, examQuestions]);

  // Chặn navigation trong app (React Router), ko pushState quá nhiều
  useEffect(() => {
    if (!isExamActive) return;

    // pushState 1 lần duy nhất
    if (window.history.state === null) {
      window.history.pushState({ preventBack: true }, "", window.location.href);
    }

    const handlePopState = (e) => {
      const confirmExit = window.confirm(
        "Bạn đang trong quá trình làm bài thi. Nếu thoát ra, các câu trả lời chưa nộp sẽ bị mất. Bạn có chắc chắn muốn thoát?"
      );
      if (!confirmExit) {
        e.preventDefault();
        window.history.pushState(
          { preventBack: true },
          "",
          window.location.href
        );
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isExamActive]);

  // Cập nhật userAnswers state bình thường để render lại UI
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleBookmarkToggle = (questionId) => {
    setBookmarkedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) newSet.delete(questionId);
      else newSet.add(questionId);
      return newSet;
    });
  };

  // Cập nhật payloadRef.answers mỗi lần userAnswers hoặc examQuestions thay đổi
  useEffect(() => {
    if (!examQuestions) return;
    payloadRef.current = {
      exam_id: Number(examIdNumber),
      answers: examQuestions
        .flatMap((part) => part.data.flatMap((group) => group.questions))
        .map((q) => ({
          question_id: q.id,
          selected_option:
            Object.prototype.hasOwnProperty.call(userAnswers, String(q.id)) &&
            userAnswers[String(q.id)] !== ""
              ? userAnswers[String(q.id)]
              : null,
        })),
    };
  }, [examQuestions, userAnswers, examIdNumber]);

  const handleSubmitExam = () => {
    if (!examQuestions) return;

    // Cập nhật payload
    payloadRef.current = {
      exam_id: Number(examIdNumber),
      answers: examQuestions
        .flatMap((part) => part.data.flatMap((group) => group.questions))
        .map((q) => ({
          question_id: q.id,
          selected_option:
            Object.prototype.hasOwnProperty.call(userAnswers, String(q.id)) &&
            userAnswers[String(q.id)] !== ""
              ? userAnswers[String(q.id)]
              : null,
        })),
    };

    // Luôn mở modal confirm dù đủ hay thiếu câu trả lời
    pendingPayloadRef.current = JSON.parse(JSON.stringify(payloadRef.current));
    setOpenConfirmModal(true);
  };

  // Hàm submit thực sự khi người dùng xác nhận nộp bài
  const handleForceSubmit = () => {
    submitExam(payloadRef.current)
      .unwrap()
      .then((res) => {
        if (res.success === true) {
          setIsExamActive(false);
          setOpenConfirmModal(false);
          pendingPayloadRef.current = null;

          // mở modal chúc mừng
          setOpenSuccessModal(true);
          setLoading(true);

          // giả lập loading 2 giây
          setTimeout(() => {
            setLoading(false);
            setOpenSuccessModal(false);
            navigate(`/test-online/describe/${examId}`);
          }, 2000);
        } else {
          toast.error("Có lỗi xảy ra !");
        }
      })
      .catch((err) => {
        console.error("Submit failed:", err);
      });
  };
  if (examQuestions?.length <= 0) return <NotFound />;

  function countQuestionsSummary(partsData) {
    let totalQuestions = 0;

    const countByPart = partsData?.map((part) => {
      const partCount = part.data.reduce(
        (sum, group) => sum + group.questions.length,
        0
      );
      totalQuestions += partCount;

      return {
        part: part.part,
        totalQuestions: partCount,
      };
    });

    return {
      totalQuestions,
      countByPart,
    };
  }
  return (
    <>
      <Box display="flex" height="100vh">
        <Box
          flex="8"
          sx={{ maxHeight: "100vh", overflowY: "auto", pr: 1 }}
          bgcolor="#f5f5f5"
          p={2}>
          <ViewList
            questions={examQuestions || []}
            selectedQuestionId={selectedQuestion?.id}
            onSelectQuestion={setSelectedQuestion}
            userAnswers={userAnswers}
            onAnswerChange={handleAnswerChange}
            bookmarkedQuestions={bookmarkedQuestions}
            onBookmarkToggle={handleBookmarkToggle}
            examName={examQuestions?.examName || examName}
            examTime={examTime}
            subjectName={subjectName}
            startTime={startTime}
            selectedDuration={selectedDuration}
          />
        </Box>

        <Box
          flex="2"
          bgcolor="#ffffff"
          p={2}
          sx={{ borderLeft: "1px solid #e0e0e0" }}>
          <DrawerList
            questions={examQuestions || []}
            onSelectQuestion={setSelectedQuestion}
            selectedQuestionId={selectedQuestion?.id}
            userAnswers={userAnswers}
            bookmarkedQuestions={bookmarkedQuestions}
            examTime={examTime}
            onSubmitExam={handleSubmitExam}
          />
        </Box>
      </Box>

      <Dialog
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        maxWidth="xs"
        fullWidth>
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningAmberIcon color="warning" />
          <Typography variant="h6" fontWeight="bold">
            Xác nhận nộp bài
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Box textAlign="start" py={1}>
            <Typography variant="body1">
              {Object.keys(userAnswers).length <
              countQuestionsSummary(examQuestions).totalQuestions ? (
                <>
                  Bạn chưa hoàn thành bài thi! <br />
                  Mới chỉ có{" "}
                  <strong style={{ color: "red" }}>
                    {Object.keys(userAnswers).length}/
                    {countQuestionsSummary(examQuestions).totalQuestions}
                  </strong>{" "}
                  câu được hoàn thành. <br />
                  Bạn có chắc chắn muốn nộp bài?
                </>
              ) : (
                <>
                  Bạn có chắc chắn muốn <strong>nộp bài</strong>? <br />
                  Hành động này sẽ kết thúc bài thi và bạn không thể quay lại.
                </>
              )}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "end", pb: 2, px: 3 }}>
          <Button
            onClick={() => setOpenConfirmModal(false)}
            variant="outlined"
            color="inherit">
            Tiếp tục
          </Button>
          <Button
            onClick={handleForceSubmit}
            variant="contained"
            color="error"
            sx={{ minWidth: 100 }}>
            Nộp bài
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSuccessModal}>
        <DialogTitle>🎉 Chúc mừng bạn!</DialogTitle>
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h6" color="success.main">
            Bạn đã nộp bài thành công!
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailExamV2;
