import express from "express";
import SubjectRouters from "./routes/subject.route";
import ExamRouters from "./routes/exam.route";
import AuthRoutes from "./routes/auth.route";

const app = express();
app.use(express.json());

app.use("/api/subject", SubjectRouters);
app.use("/api/exam", ExamRouters);
app.use("/api/auth", AuthRoutes);

app.listen(3000, async () => {
  console.log("Server started on port 3000");
});
