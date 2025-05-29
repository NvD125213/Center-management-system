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
import SchoolIcon from "@mui/icons-material/School";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { GoGoal } from "react-icons/go";

const roadmapData = [
  {
    level: "Kiểm tra trình độ",
    icon: <QuizIcon />,
    title: "KIỂM TRA TRÌNH ĐỘ NỀN MIỄN PHÍ",
    description:
      "Trước khi chọn lộ trình học TOEIC phù hợp, hãy đảm bảo bạn nắm rõ trình độ nền hiện tại của mình. Nếu đang không xác định được trình độ, hãy để EZ giúp bạn bằng việc click vào 1 trong những bài test dưới đây",
    tests: [
      {
        title: "Bài test TOEIC Reading",
        description: "Kiểm tra kỹ năng đọc hiểu",
        duration: "45 phút",
        link: "/test/reading",
      },
      {
        title: "Bài test TOEIC Listening",
        description: "Kiểm tra kỹ năng nghe hiểu",
        duration: "30 phút",
        link: "/test/listening",
      },
      {
        title: "Bài test TOEIC Full",
        description: "Kiểm tra toàn diện 2 kỹ năng",
        duration: "120 phút",
        link: "/test/full",
      },
    ],
  },
  {
    level: "Mất gốc - 450+",
    icon: <SchoolIcon />,
    title: "TỪ MẤT GỐC - 450+",
    description:
      "Cá nhân hóa lộ trình học TOEIC theo level từ mất gốc đến 450+/990 TOEIC. Cam kết đạt mục tiêu sau 5 tháng học tại Zenlish",
    tests: [
      {
        title: "Khóa học TOEIC Foundation",
        description: "Xây dựng nền tảng tiếng Anh vững chắc",
        duration: "3 tháng",
        link: "/course/foundation",
      },
      {
        title: "Khóa học TOEIC 450+",
        description: "Luyện thi TOEIC từ cơ bản đến nâng cao",
        duration: "5 tháng",
        link: "/course/450plus",
      },
    ],
  },
  {
    level: "450 - 700+",
    icon: <TrendingUpIcon />,
    title: "TỪ 450 - 700+ TOEIC",
    description:
      "Bứt phá điểm TOEIC trong 3 tháng. Chiến lược học tập tối ưu, luyện đề chuyên sâu. Phát triển toàn diện kỹ năng Listening & Reading. Cam kết đạt mục tiêu, sẵn sàng cho TOEIC cấp độ cao.",
    tests: [
      {
        title: "Khóa học TOEIC 700+",
        description: "Luyện thi TOEIC chuyên sâu",
        duration: "3 tháng",
        link: "/course/700plus",
      },
      {
        title: "Khóa học TOEIC Speaking & Writing",
        description: "Phát triển kỹ năng nói và viết",
        duration: "3 tháng",
        link: "/course/speaking-writing",
      },
    ],
  },
  {
    level: "800+ and 4 skills",
    icon: <GoGoal />,
    title: "TOEIC 4 KỸ NĂNG",
    description:
      "Bứt phá điểm TOEIC trong 3 tháng. Chiến lược học tập tối ưu, luyện đề chuyên sâu. Phát triển toàn diện kỹ năng Listening & Reading. Cam kết đạt mục tiêu, sẵn sàng cho TOEIC cấp độ cao.",
    tests: [
      {
        title: "Khóa học TOEIC 700+",
        description: "Luyện thi TOEIC chuyên sâu",
        duration: "3 tháng",
        link: "/course/700plus",
      },
      {
        title: "Khóa học TOEIC Speaking & Writing",
        description: "Phát triển kỹ năng nói và viết",
        duration: "3 tháng",
        link: "/course/speaking-writing",
      },
    ],
  },
];

const MotionAccordion = motion(Accordion);

const Roadmap = () => {
  const theme = useTheme();

  return (
    <section className="bg-light py-20">
      <div className="container mx-auto px-4">
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
            Roadmap tại EZ
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
            Hãy xem lộ trình học TOEIC bên dưới, từ những lớp MẤT GỐC đến các
            lớp TOEIC 4 kỹ năng chuyên nghiệp.
          </Typography>

          {roadmapData.map((item, index) => (
            <MotionAccordion
              key={item.level}
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
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: "bold" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.level}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ p: 2 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4 }}>
                    {item.description}
                  </Typography>
                  <Grid container spacing={3}>
                    {item.tests.map((test, idx) => (
                      <Grid item xs={12} md={6} key={idx}>
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
                            {/* Header Section */}
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
                                  {test.title}
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
                                {test.description}
                              </Typography>
                            </Box>

                            {/* Footer Section */}
                            <Box
                              sx={{
                                p: 2,
                                mt: "auto",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "white",
                              }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: theme.palette.text.secondary,
                                  fontWeight: 500,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}>
                                <span>⏱️</span> {test.duration}
                              </Typography>
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
                                href={test.link}>
                                Bắt đầu ngay
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </AccordionDetails>
            </MotionAccordion>
          ))}
        </Box>
      </div>
    </section>
  );
};

export default Roadmap;
