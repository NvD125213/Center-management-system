// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Lưu lại đường dẫn cũ nếu muốn, hoặc chỉ navigate về /signin
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
