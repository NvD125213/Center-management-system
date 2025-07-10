import ViewList from "../components/ExamV2/ViewList";
import DrawerList from "../components/ExamV2/DrawerList";
import { Box } from "@mui/material";
import { useState } from "react";

const DetailExamV2 = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <Box display="flex" height="100vh">
      <Box
        flex="8"
        sx={{
          maxHeight: "100vh",
          overflowY: "auto",
          pr: 1,
        }}
        bgcolor="#f5f5f5"
        p={2}>
        <ViewList
          selectedQuestionId={selectedQuestion?.id}
          onSelectQuestion={setSelectedQuestion}
        />
      </Box>

      <Box
        flex="2"
        bgcolor="#ffffff"
        p={2}
        sx={{ borderLeft: "1px solid #e0e0e0" }}>
        <DrawerList
          onSelectQuestion={setSelectedQuestion}
          selectedQuestionId={selectedQuestion?.id}
        />
      </Box>
    </Box>
  );
};

export default DetailExamV2;
