import { useGetSubjectWithExamQuery } from "../services/subjectServices.js";
import AccordionComponent from "../components/Common/Accodion.jsx";
import { Box } from "@mui/material";
import Hero from "../components/Hero/Hero.jsx";
const ListSubjectExam = () => {
  const breadcrumbPaths = [
    { name: "Trang chủ", url: "/" },
    { name: "Test online", url: "/test-online" },
  ];

  const { data: subjectExamData, loading } = useGetSubjectWithExamQuery();

  // Transform data to match AccordionComponent expected format
  const transformedData = subjectExamData
    ? subjectExamData.map((subject) => ({
        id: subject.id,
        name: subject.name,
        description: subject.description,
        exams: subject.exams
          ? subject.exams.map((exam) => ({
              id: exam.id,
              name: exam.name,
              description: exam.description,
              duration: exam.duration,
              link: exam.link || `/exam/${exam.id}`,
            }))
          : [],
      }))
    : [];

  return (
    <>
      <Hero title="Test online" breadcrumbPaths={breadcrumbPaths} />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: 3,
          boxShadow: "none",
        }}>
        <AccordionComponent
          titleRoot="Danh sách các chuyên đề và bài thi TOEIC"
          description="Khám phá các chuyên đề và bài thi có sẵn trên hệ thống của chúng tôi"
          dataList={transformedData}
          loading={loading}
        />
      </Box>
    </>
  );
};

export default ListSubjectExam;
