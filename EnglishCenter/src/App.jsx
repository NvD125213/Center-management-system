import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { ScrollToTop } from "./components/Common/ScrollToTop";
import AppLayout from "./layouts/AppLayout";
import PortalPage from "./pages/PortalPage";
import SignInForm from "./pages/Signin";
import SignUpForm from "./pages/Signup";
import { Provider } from "react-redux";
import store from "./stores/store";
import BlogCard from "./components/Common/Card";
import ListCard from "./components/ListCard/ListCard";
import ListSubjectExam from "./pages/ListSubjectExam";
import DescribeExam from "./components/Exam/Describe";
import AppTestOnline from "./layouts/AppTestOnline";
import DetailExam from "./components/Exam/index";
import AlertResult from "./components/Exam/AlertResult";
import BlogDetail from "./pages/BlogDetail";
import ProtectedRoute from "./routes/protectedRoute";
import ClassSchedule from "./pages/ListClassActive";
import DetailExamV2 from "./pages/DetailExam";

const App = () => {
  return (
    <Provider store={store}>
      <main className="overflow-x-hidden bg-white text-dark">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<PortalPage />} />
              <Route path="/card-blog" element={<BlogCard />} />
              <Route path="/list-card" element={<ListCard />} />
              <Route path="/lich-khai-giang" element={<ClassSchedule />} />
              <Route
                path="/test-online"
                element={
                  <ProtectedRoute>
                    <ListSubjectExam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test-online/describe/:examId"
                element={
                  <ProtectedRoute>
                    <DescribeExam />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test-online/alert-result"
                element={
                  <ProtectedRoute>
                    <AlertResult />
                  </ProtectedRoute>
                }
              />
              <Route path="/blog/menu/*" element={<ListCard />} />
              <Route path="/blog/detail/:id/:slug" element={<BlogDetail />} />
              {/* Route động cho menu với path đa cấp - đặt sau cùng */}
            </Route>
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/test-online-v2/detail" element={<DetailExamV2 />} />
            <Route
              path="/test-online/detail/:part?/:group?/:question?"
              element={
                <ProtectedRoute>
                  <AppTestOnline />
                </ProtectedRoute>
              }>
              <Route index element={<DetailExam />} />
            </Route>
          </Routes>
        </Router>
      </main>
    </Provider>
  );
};

export default App;
