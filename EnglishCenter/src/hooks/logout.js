import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../../stores/authSlice";
import { useNavigate } from "react-router-dom";

const useSimpleLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    dispatch(logout());
    navigate("/");
  };
};

export default useSimpleLogout;
