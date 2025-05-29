// EnglishCenter/src/components/AuthButton/AuthButton.jsx
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../services/authServices";
import { logout } from "../../stores/authSlice";
import { toast } from "react-hot-toast";

const AuthButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success("Đăng xuất thành công!");
      navigate("/");
    } catch (error) {
      toast.error("Đăng xuất thất bại!");
      console.error("Logout error:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => navigate("/signin")}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
        Đăng nhập
      </button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors">
        <span>{user?.full_name || user?.email}</span>
        <span className="text-sm">▼</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
        <button
          onClick={() => navigate("/profile")}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Thông tin cá nhân
        </button>
        <button
          onClick={() => navigate("/test-online")}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Test online
        </button>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AuthButton;
