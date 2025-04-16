import express from "express";
import SubjectRouters from "./routes/subject.route";
import ExamRouters from "./routes/exam.route";
import PartRoutes from "./routes/part.route";
import AuthRoutes from "./routes/auth.route";
import UserRoutes from "./routes/user.route";
import QuestionRoutes from "./routes/question.route";

import { authorize, ensureAuthenticated } from "./middlewares/auth";
import session from "express-session";
import passport from "passport";

const app = express();
app.use(express.json());

// Save session signin google
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 3,
    },
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/subject", SubjectRouters);
app.use("/api/exam", ExamRouters);
app.use("/api/part", PartRoutes);
app.use("/api/question", QuestionRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/admin", ensureAuthenticated, authorize([1]), (req, res) => {
  res.status(200).json({
    message: "Only admins can access this route",
  });
});

app.use(
  "/api/moderator",
  ensureAuthenticated,
  authorize([1, 2]),
  (req, res) => {
    res.status(200).json({
      message: "Only admins and staff can access this route",
    });
  }
);

app.listen(3000, async () => {
  console.log("Server started on port 3000");
});
