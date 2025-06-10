import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
  Divider,
  Chip,
  Modal,
  IconButton,
  Link,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import TimerIcon from "@mui/icons-material/Timer";
import Hero from "../Hero/Hero";
import { useGetHistoryQuery } from "../../services/historyServices";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExamHistoryDetail from "./ExamHistoryDetail";

import CommentTable from "./CommentTable";

const TOEIC_DEFAULT_DESCRIPTION = `Cấu trúc bài thi TOEIC:

1. Phần Listening (100 câu - 45 phút):
   - Part 1: Mô tả hình ảnh (6 câu)
   - Part 2: Hỏi đáp (25 câu)
   - Part 3: Hội thoại ngắn (39 câu)
   - Part 4: Bài nói ngắn (30 câu)

2. Phần Reading (100 câu - 75 phút):
   - Part 5: Hoàn thành câu (30 câu)
   - Part 6: Hoàn thành đoạn văn (16 câu)
   - Part 7: Đọc hiểu đoạn văn (54 câu)

Tổng thời gian làm bài: 120 phút
Tổng số câu hỏi: 200 câu
Thang điểm: 10-990 điểm

Lưu ý:
- Mỗi câu hỏi chỉ có một đáp án đúng
- Không được phép bỏ trống câu hỏi
- Nên phân bổ thời gian hợp lý cho từng phần`;

const ExamInfoModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="exam-info-modal"
      aria-describedby="exam-info-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "800px",
          maxHeight: "90vh",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}>
          <Typography variant="h5" component="h2">
            Thông tin chi tiết bài thi TOEIC
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Typography
          variant="body1"
          component="pre"
          sx={{
            whiteSpace: "pre-wrap",
            fontFamily: "inherit",
            backgroundColor: "grey.50",
            p: 3,
            borderRadius: 1,
          }}>
          {TOEIC_DEFAULT_DESCRIPTION}
        </Typography>
      </Box>
    </Modal>
  );
};

ExamInfoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ConfirmStartModal = ({
  open,
  onClose,
  examTime,
  examName,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="confirm-start-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "500px",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}>
          <Typography variant="h5" component="h2">
            Xác nhận bắt đầu bài thi
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {examName}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <TimerIcon color="primary" />
            <Typography variant="body1">
              Thời gian làm bài: <strong>{examTime} phút</strong>
            </Typography>
          </Box>

          <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 2 }}>
            Bài thi sẽ tự động kết thúc khi hết thời gian. Hãy đảm bảo bạn hoàn
            thành bài thi trong thời gian quy định.
          </Alert>

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              • Không được phép tải lại trang hoặc thoát khỏi bài thi
              <br />
              • Hệ thống sẽ tự động lưu đáp án của bạn
              <br />• Kết quả sẽ được hiển thị ngay sau khi hoàn thành
            </Typography>
          </Alert>
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onConfirm}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}>
            {isLoading ? "Đang chuẩn bị..." : "Bắt đầu làm bài"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ConfirmStartModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  examTime: PropTypes.string.isRequired,
  examName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

const DescribeExam = () => {
  const { examId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { examName, examDescription, subjectName, duration } =
    location.state || {};
  const [examTime, setExamTime] = useState(duration || "");
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [historyDetailOpen, setHistoryDetailOpen] = useState(false);

  // Get user ID from auth slice
  const userId = useSelector((state) => state.auth.user?.id);

  // Fetch exam history
  const { data: historyData, isLoading: isHistoryLoading } = useGetHistoryQuery(
    { user_id: userId, exam_id: examId },
    { skip: !userId || !examId }
  );

  const handleTimeChange = (event) => {
    setExamTime(event.target.value);
  };

  const handleStartExam = () => {
    if (!examTime) {
      // TODO: Show error message that time must be selected
      return;
    }
    setConfirmModalOpen(true);
  };

  const handleConfirmStart = () => {
    // Navigate to base path with exam time and examId
    navigate(`/test-online/detail`, {
      state: {
        examId,
        examTime: Number(examTime),
        examName,
        subjectName,
        startTime: new Date().getTime(),
        selectedDuration: Number(examTime),
      },
    });
  };

  const handleOpenInfoModal = () => setInfoModalOpen(true);
  const handleCloseInfoModal = () => setInfoModalOpen(false);
  const handleCloseConfirmModal = () => setConfirmModalOpen(false);

  const breadcrumbPaths = [
    { name: "Trang chủ", url: "/" },
    { name: "Test online", url: "/test-online" },
    { name: "Bài thi", url: `/test-online/describe/${examId}` },
  ];

  return (
    <>
      <Hero
        title={`Chi tiết bài thi ${examName}`}
        breadcrumbPaths={breadcrumbPaths}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: "1400px",
            margin: "0 auto",
            mt: 4,
            display: "flex",
            flexWrap: "wrap", // cho phép xuống dòng trên mobile
            gap: 2,
          }}>
          {/* Describe & History Section (6/4) */}
          <Box
            sx={{
              flex: "1 1 50%",
              minWidth: "100%", // fallback cho mobile
              "@media (min-width: 900px)": {
                minWidth: 0,
              },
            }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              {/* Describe section */}
              <Box sx={{ mb: 3 }}>
                {subjectName && (
                  <Chip
                    label={subjectName}
                    color="primary"
                    variant="outlined"
                    sx={{ mr: 1, mb: 1 }}
                  />
                )}
                {examName && (
                  <Typography variant="h4" component="h1" gutterBottom>
                    {examName}
                  </Typography>
                )}
                {examDescription && (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}>
                    {examDescription}
                  </Typography>
                )}
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleOpenInfoModal}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}>
                  <InfoIcon fontSize="small" />
                  Xem thông tin chi tiết bài thi
                </Link>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* History Section */}
              {historyData?.exam_history &&
                historyData.exam_history.length > 0 && (
                  <Box sx={{ mb: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}>
                      <Typography variant="h6" gutterBottom>
                        Lịch sử làm bài
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => setHistoryDetailOpen(true)}>
                        Xem chi tiết
                      </Button>
                    </Box>
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Thời gian làm bài</TableCell>
                            <TableCell align="center">Tổng số câu</TableCell>
                            <TableCell align="center">Số câu đúng</TableCell>
                            <TableCell align="center">Điểm số</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {historyData.exam_history.map((history, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                {format(
                                  new Date(history.submitted_at),
                                  "dd/MM/yyyy HH:mm"
                                )}
                              </TableCell>
                              <TableCell align="center">
                                {history.total_questions}
                              </TableCell>
                              <TableCell align="center">
                                {history.correct_answers}
                              </TableCell>
                              <TableCell align="center">
                                {history.total_score}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}

              {/* Select Time */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="exam-time-label">Thời gian thi</InputLabel>
                <Select
                  labelId="exam-time-label"
                  value={examTime}
                  label="Thời gian thi"
                  onChange={handleTimeChange}>
                  <MenuItem value={30}>30 phút</MenuItem>
                  <MenuItem value={45}>45 phút</MenuItem>
                  <MenuItem value={60}>60 phút</MenuItem>
                  <MenuItem value={90}>90 phút</MenuItem>
                  <MenuItem value={120}>120 phút</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleStartExam}
                sx={{ mt: 3 }}
                disabled={!examTime}>
                Bắt đầu thi
              </Button>
            </Paper>
          </Box>

          {/* Comment Table Section */}
          <Box
            sx={{
              flex: "1 1 40%",
              minWidth: "100%", // fallback cho mobile
              "@media (min-width: 900px)": {
                minWidth: 0,
              },
            }}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <CommentTable examId={examId} userId={userId} />
            </Paper>
          </Box>
        </Box>
      </Container>

      {/* Modals */}
      <ExamInfoModal open={infoModalOpen} onClose={handleCloseInfoModal} />
      <ConfirmStartModal
        open={confirmModalOpen}
        onClose={handleCloseConfirmModal}
        examTime={examTime}
        examName={examName}
        onConfirm={handleConfirmStart}
        isLoading={false}
      />
      <ExamHistoryDetail
        open={historyDetailOpen}
        onClose={() => setHistoryDetailOpen(false)}
        examData={historyData}
        examName={examName}
      />
    </>
  );
};

export default DescribeExam;
