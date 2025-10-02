import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types"; // Sửa lại tên import

const ExamResult = ({
  success,
  data: { total_score, correct_answers, incorrect_answers, total_questions },
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#e3f2fd"
      p={2}>
      <Card sx={{ width: 400, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            color={success ? "primary.main" : "error.main"}
            gutterBottom>
            {success ? "Exam Completed!" : "Exam Failed"}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                Total Score:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary.main">
                {total_score}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                Correct Answers:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="success.main">
                {correct_answers}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                Incorrect Answers:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" fontWeight="bold" color="error.main">
                {incorrect_answers}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body1" color="text.secondary">
                Total Questions:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                fontWeight="bold"
                color="primary.main">
                {total_questions}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExamResult;

ExamResult.propTypes = {
  success: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    total_score: PropTypes.number.isRequired,
    correct_answers: PropTypes.number.isRequired,
    incorrect_answers: PropTypes.number.isRequired,
    total_questions: PropTypes.number.isRequired,
  }).isRequired,
};
