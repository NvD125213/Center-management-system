import { Outlet, useParams, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import NavbarTest from "../components/Navbar/NavbarTest";
import { useGetAllQuestionsOnExamQuery } from "../services/questionServices";

const AppTestOnline = () => {
  const { question: questionId, examId: paramExamId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Luôn khai báo các hook ở đầu
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  // Lấy thông tin state nếu có
  const { examId, examName, selectedDuration, startTime } =
    location.state || {};

  // Fetch questions from API
  const {
    data: examQuestions,
    isLoading,
    error,
  } = useGetAllQuestionsOnExamQuery(examId, {
    skip: !examId,
  });

  // Update current question when URL params change
  useEffect(() => {
    if (questionId) {
      setCurrentQuestionId(String(questionId));
    }
  }, [questionId]);

  // Block browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Nếu bạn reload trang, kết quả làm bài sẽ không được lưu lại. Bạn có chắc chắn muốn tiếp tục?";
      return e.returnValue;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Redirect if no exam data or duration
  useEffect(() => {
    if (!examId || !selectedDuration || (!isLoading && !examQuestions)) {
      // Redirect to exam list if no exam data or duration
      window.location.href = "/";
    }
  }, [examId, selectedDuration, isLoading, examQuestions]);

  // Nếu reload mất state, redirect và không render gì cả
  useEffect(() => {
    if (!location.state) {
      // Ưu tiên lấy examId từ URL param nếu có
      if (paramExamId) {
        navigate(`/test-online/describe/${paramExamId}`, { replace: true });
      } else {
        navigate("/test-online", { replace: true });
      }
    }
  }, [location.state, navigate, paramExamId]);

  // Nếu không có state, không render gì cả (tránh loading)
  if (!location.state) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài thi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Có lỗi xảy ra khi tải bài thi</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header cố định */}
      <NavbarTest
        examQuestions={examQuestions}
        currentQuestionId={currentQuestionId}
        examName={examName}
        duration={selectedDuration}
        startTime={startTime}
      />
      {/* Nội dung trang */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppTestOnline;
