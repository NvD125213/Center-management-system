import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Chip,
  Divider,
  Badge,
  Paper,
  Grid,
  Button,
  CircularProgress,
} from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TimerIcon from "@mui/icons-material/Timer";
import SendIcon from "@mui/icons-material/Send";
import LogoImage from "../../assets/Logo/logo_last.png";
import { useSelector } from "react-redux";
import { useSubmitAnswerMutation } from "../../services/answerServices";

const QuestionCircle = ({ number, status, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        backgroundColor:
          status === "current"
            ? "primary.main"
            : status === "answered"
            ? "success.main"
            : "grey.300",
        color: status === "unanswered" ? "text.primary" : "white",
        "&:hover": {
          transform: "scale(1.1)",
          boxShadow: 2,
        },
      }}>
      <Typography variant="body2" fontWeight="bold">
        {number}
      </Typography>
    </Box>
  );
};

QuestionCircle.propTypes = {
  number: PropTypes.number.isRequired,
  status: PropTypes.oneOf(["current", "answered", "unanswered"]),
  onClick: PropTypes.func,
};

QuestionCircle.defaultProps = {
  status: "unanswered",
};

const NavbarTest = ({
  examName = "New Economy TOEIC Test 1",
  duration = 120,
  examQuestions = [],
  startTime,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionId } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const answers = useSelector((state) => state.question.answers);
  const examId = useSelector((state) => state.question.examId);

  const [submitAnswer, { isLoading: isSubmitting }] = useSubmitAnswerMutation();

  // Calculate time left based on startTime and duration
  useEffect(() => {
    if (startTime && duration) {
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const elapsedMinutes = (now - startTime) / (1000 * 60);
        const remainingMinutes = Math.max(0, duration - elapsedMinutes);
        return Math.floor(remainingMinutes * 60); // Convert to seconds
      };

      setTimeLeft(calculateTimeLeft());

      const timer = setInterval(() => {
        const remaining = calculateTimeLeft();
        setTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, duration]);

  const formatTime = (seconds) => {
    if (seconds === null) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSubmitExam = async () => {
    console.log("Starting submit process...");
    console.log("Current answers:", answers);
    console.log("Current examId:", examId);

    if (!examId) {
      alert("Không tìm thấy thông tin bài thi. Vui lòng tải lại trang.");
      return;
    }

    if (Object.keys(answers).length === 0) {
      alert(
        "Bạn chưa trả lời câu hỏi nào. Vui lòng trả lời ít nhất một câu hỏi."
      );
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn nộp bài thi?")) {
      try {
        const formattedAnswers = Object.entries(answers).map(
          ([questionId, answer]) => ({
            question_id: Number(questionId),
            selected_option: answer,
          })
        );

        console.log("Formatted answers for submission:", formattedAnswers);
        console.log("Submitting with data:", {
          exam_id: Number(examId),
          answers: formattedAnswers,
        });

        const response = await submitAnswer({
          exam_id: Number(examId),
          answers: formattedAnswers,
        }).unwrap();

        console.log("Submit response:", response);

        if (response?.success) {
          console.log("Submission successful, navigating to results...");
          navigate("/test-online/alert-result", {
            state: {
              examId,
              result: response.data,
              examName,
            },
          });
        }
      } catch (error) {
        console.error("Detailed error submitting exam:", {
          error,
          errorMessage: error.message,
          errorData: error.data,
          status: error.status,
        });
        alert(
          `Có lỗi xảy ra khi nộp bài thi: ${
            error.message || "Vui lòng thử lại"
          }`
        );
      }
    }
  };

  // Transform examQuestions into flat array of questions for easier handling
  const flattenedQuestions = examQuestions.reduce((acc, part) => {
    if (part.data && part.data.length > 0) {
      part.data.forEach((group) => {
        if (group.questions && group.questions.length > 0) {
          group.questions.forEach((question) => {
            acc.push({
              ...question,
              part: part.part,
              group_id: group.id,
              global_order: question.global_order || 0,
            });
          });
        }
      });
    }
    return acc;
  }, []);

  // Group questions by part
  const questionsByPart = flattenedQuestions.reduce((acc, question) => {
    const part = question.part;
    if (!acc[part]) {
      acc[part] = [];
    }
    acc[part].push(question);
    return acc;
  }, {});

  const handleQuestionClick = (question) => {
    if (!question.part || !question.group_id || !question.id) {
      console.error("Missing required question data:", question);
      return;
    }

    navigate(
      `/test-online/detail/${question.part}/${question.group_id}/${question.id}`,
      {
        state: { ...location.state, examId: location.state?.examId },
        replace: false,
      }
    );
    setDrawerOpen(false);
  };

  const getQuestionStatus = (question) => {
    if (question.id === questionId) return "current";
    if (answers[question.id]) return "answered";
    return "unanswered";
  };

  const totalQuestions = flattenedQuestions.length;

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}>
      <Toolbar
        sx={{
          height: "120px",
          minHeight: "80px",
          px: { xs: 2, sm: 3, md: 8 },
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 2,
          alignItems: "center",
        }}>
        {/* Left Section - Logo and Test Type */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: "200px",
          }}>
          <img src={LogoImage} alt="Logo" style={{ height: "50px" }} />
        </Box>

        {/* Center Section - Exam Name */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            px: 2,
          }}>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              textAlign: "center",
              fontSize: { xs: "1.1rem", sm: "1.5rem" },
              lineHeight: 1.2,
              maxWidth: "600px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
            {examName}
          </Typography>
        </Box>

        {/* Right Section - Timer, Submit Button and Question List */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            minWidth: "280px",
            justifyContent: "flex-end",
          }}>
          <Chip
            icon={<TimerIcon />}
            label={formatTime(timeLeft)}
            color="primary"
            variant="outlined"
            sx={{
              fontWeight: "bold",
              "& .MuiChip-icon": { color: "primary.main" },
              minWidth: "120px",
              height: "40px",
              fontSize: "1rem",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            onClick={handleSubmitExam}
            disabled={isSubmitting || Object.keys(answers).length === 0}
            sx={{
              height: "40px",
              px: 2,
              fontWeight: "bold",
              display: { xs: "none", sm: "flex" },
              minWidth: "120px",
            }}>
            {isSubmitting ? "Đang nộp..." : "Nộp bài"}
          </Button>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
              },
              width: "48px",
              height: "48px",
              "& .MuiSvgIcon-root": {
                fontSize: "1.5rem",
              },
            }}>
            <Badge
              badgeContent={totalQuestions}
              color="primary"
              sx={{
                "& .MuiBadge-badge": {
                  right: -3,
                  top: 3,
                  fontSize: "0.75rem",
                  height: "20px",
                  minWidth: "20px",
                },
              }}>
              <FormatListNumberedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            width: { xs: "100%", sm: 360 },
            maxWidth: "100%",
          },
        }}>
        <Box
          sx={{
            width: "100%",
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation">
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Danh sách câu hỏi
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              overflow: "auto",
            }}>
            {Object.entries(questionsByPart).map(([part, partQuestions]) => (
              <Paper
                key={part}
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}>
                  {part}
                </Typography>
                <Grid container spacing={1}>
                  {partQuestions
                    .sort((a, b) => a.global_order - b.global_order)
                    .map((question) => (
                      <Grid item key={question.id}>
                        <QuestionCircle
                          number={question.global_order}
                          status={getQuestionStatus(question)}
                          onClick={() => handleQuestionClick(question)}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Paper>
            ))}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
};

NavbarTest.propTypes = {
  examName: PropTypes.string,
  duration: PropTypes.number,
  examQuestions: PropTypes.arrayOf(
    PropTypes.shape({
      part: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          questions: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              global_order: PropTypes.number,
              title: PropTypes.string,
              option: PropTypes.object,
              elements: PropTypes.array,
            })
          ).isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  startTime: PropTypes.number,
};

export default NavbarTest;
