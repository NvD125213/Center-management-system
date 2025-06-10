import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AlertResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, examName } = location.state || {};

  if (!result) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  const { total_score, correct_answers, total_questions } = result;
  const percentage = Math.round((correct_answers / total_questions) * 100);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        bgcolor: "background.default",
      }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: 600,
          width: "100%",
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}>
        <CheckCircleIcon
          sx={{
            fontSize: 80,
            color: "success.main",
            mb: 2,
          }}
        />

        <Typography variant="h4" gutterBottom fontWeight="bold">
          Kết quả bài thi
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          {examName}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 4 }}>
          <Typography variant="h2" color="primary" fontWeight="bold">
            {percentage}%
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Tỷ lệ đúng
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            mb: 4,
          }}>
          <Box>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {total_score}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Điểm số
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {correct_answers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Câu đúng
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" color="text.primary" fontWeight="bold">
              {total_questions}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tổng số câu
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/test-online")}
          sx={{ px: 4 }}>
          Quay lại trang chủ
        </Button>
      </Paper>
    </Box>
  );
};

export default AlertResult;
