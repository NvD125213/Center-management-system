import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  useTheme,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const MotionAccordion = motion(Accordion);

const AccordionComponent = ({ titleRoot, description, dataList }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleStartExam = (exam, subjectName) => {
    navigate(`/test-online/describe/${exam.id}`, {
      state: {
        examName: exam.name,
        examDescription: exam.description,
        subjectName: subjectName,
        duration: exam.duration,
      },
    });
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "white",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 2,
        }}>
        {titleRoot}
      </Typography>

      <Typography
        variant="h6"
        align="center"
        sx={{
          color: theme.palette.text.secondary,
          mb: 6,
          maxWidth: "800px",
          mx: "auto",
        }}>
        {description || "Not description"}
      </Typography>

      {dataList.map((item, index) => (
        <MotionAccordion
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          sx={{
            mb: 2,
            borderRadius: "8px !important",
            "&:before": { display: "none" },
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: "#1976d2" }} />}
            sx={{
              backgroundColor: "white",
              color: "#1976d2",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: theme.palette.grey[50],
              },
              border: "1px solid",
              borderColor: theme.palette.grey[200],
            }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                sx={{
                  backgroundColor: "rgba(105, 167, 156, 0.1)",
                  borderRadius: "50%",
                  p: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <SchoolIcon />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bold" }}>
                  {item.name}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {item.name}
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                {item.description || "Not description"}
              </Typography>
              <Grid container spacing={3}>
                {item.exams && item.exams.length > 0 ? (
                  item.exams.map((exam, idx) => (
                    <Grid item xs={12} md={6} key={exam.id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          },
                        }}>
                        <CardContent
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            p: 0,
                          }}>
                          <Box
                            sx={{
                              p: 3,
                              pb: 2,
                              borderBottom: "1px solid",
                              borderColor: "divider",
                              backgroundColor: theme.palette.grey[50],
                            }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                mb: 1,
                              }}>
                              <AssignmentIcon
                                sx={{
                                  color: "#1976d2",
                                  fontSize: "1.5rem",
                                }}
                              />
                              <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "1.1rem",
                                  color: "#1976d2",
                                  flex: 1,
                                }}>
                                {exam.name}
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                pl: 4.5,
                                lineHeight: 1.5,
                                minHeight: "3em",
                              }}>
                              {exam.description || "No description available."}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              p: 2,
                              mt: "auto",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: "white",
                            }}>
                            <Button
                              variant="contained"
                              sx={{
                                backgroundColor: "#1976d2",
                                borderRadius: "20px",
                                textTransform: "none",
                                px: 2.5,
                                py: 0.75,
                                fontWeight: 500,
                                boxShadow: "none",
                                "&:hover": {
                                  backgroundColor: "rgb(95, 157, 146)",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                },
                              }}
                              onClick={() => handleStartExam(exam, item.name)}>
                              Bắt đầu ngay
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                ) : (
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center">
                      No exams available for this level.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </AccordionDetails>
        </MotionAccordion>
      ))}
    </Box>
  );
};

AccordionComponent.propTypes = {
  titleRoot: PropTypes.string,
  description: PropTypes.string,
  dataList: PropTypes.array,
};

export default AccordionComponent;
