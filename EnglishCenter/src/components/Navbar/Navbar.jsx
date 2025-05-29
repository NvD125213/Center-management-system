import { motion } from "framer-motion";
import { IoMdMenu } from "react-icons/io";
import Logo from "../../assets/Logo/logo_last.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthButton from "./AuthButton";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../../services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setError, setLoading } from "../../stores/authSlice";
import { useGetMenusQuery } from "../../services/menuServices";

// Hàm chuyển đổi tên thành slug
const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
    .replace(/[đĐ]/g, "d") // Chuyển đổi đ/Đ thành d
    .replace(/([^0-9a-z-\s])/g, "") // Xóa các ký tự đặc biệt
    .replace(/(\s+)/g, "-") // Thay thế khoảng trắng bằng dấu -
    .replace(/-+/g, "-") // Xóa các dấu - liên tiếp
    .replace(/^-+|-+$/g, ""); // Xóa dấu - ở đầu và cuối
};

const RecursiveMenu = ({ items, level = 1 }) => {
  return (
    <ul className="bg-white shadow-lg rounded-md min-w-[200px] py-2">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <div className="group/submenu">
            <Link
              to={item.path}
              className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full">
              <div className="flex items-center justify-between">
                <span>{item.title}</span>
                {item.children && item.children.length > 0 && (
                  <span className="ml-2 text-gray-500">▸</span>
                )}
              </div>
            </Link>

            {item.children && item.children.length > 0 && (
              <div
                className={`absolute z-50 transition-all duration-200 ease-in-out opacity-0 invisible group-hover/submenu:opacity-100 group-hover/submenu:visible
                  ${
                    level === 1
                      ? "top-full left-0 mt-1"
                      : "top-0 left-full ml-1"
                  }`}>
                <RecursiveMenu items={item.children} level={level + 1} />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

RecursiveMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      path: PropTypes.string,
      link: PropTypes.string,
      children: PropTypes.array,
    })
  ).isRequired,
  level: PropTypes.number,
};

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  // Gọi dữ liệu user lên
  const {
    data: userData,
    error,
    isLoading: userLoading,
  } = useGetCurrentUserQuery(undefined, {
    skip: !isAuthenticated, // Chỉ gọi API khi đã xác thực
  });

  useEffect(() => {
    if (userLoading) {
      dispatch(setLoading(true));
    } else {
      // Khi không còn loading, cập nhật state
      dispatch(setLoading(false));
      if (error) {
        dispatch(setError(error));
      } else if (userData) {
        dispatch(setCredentials(userData));
      }
    }
  }, [userData, error, userLoading, dispatch]);

  // Gọi dữ liệu menu từ API
  const {
    data: menuData,
    isLoading: menuLoading,
    error: menuError,
  } = useGetMenusQuery();

  // Hàm format dữ liệu menu từ API
  const formatMenuItems = (items, parentPath = "") => {
    if (!items || !Array.isArray(items)) {
      return [];
    }

    return items.map((item) => {
      const currentPath = convertToSlug(item.name);
      const fullPath = parentPath
        ? `${parentPath}/${currentPath}`
        : `/${currentPath}`;

      return {
        id: item.id,
        title: item.name,
        path: fullPath,
        children:
          item.children && item.children.length > 0
            ? formatMenuItems(item.children, fullPath)
            : undefined,
      };
    });
  };

  // Xác định menu nào sẽ được sử dụng
  const getMenuItems = () => {
    if (menuLoading) {
      return [];
    }

    if (menuError) {
      return [];
    }

    if (!menuData || !menuData.data) {
      return [];
    }

    return formatMenuItems(menuData.data);
  };

  const menuItems = getMenuItems();

  // Kiểm tra xem đã sẵn sàng render AuthButton chưa
  // Nếu không authenticated, không cần đợi userLoading
  const isAuthReady = !isAuthenticated ? true : !isLoading && !userLoading;

  return (
    <nav className="relative z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="container py-6 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}>
          <Link to="/">
            <img
              src={Logo}
              alt="EZ Center Logo"
              className="h-10 w-auto object-contain cursor-pointer"
            />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          {menuLoading ? (
            // Loading state cho menu
            <div className="flex items-center gap-6">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-200 rounded animate-pulse w-20"
                />
              ))}
            </div>
          ) : (
            <ul className="flex items-center gap-6">
              {menuItems.map((menu) => (
                <li key={menu.id} className="relative group/main">
                  <Link
                    to={menu.path}
                    className="inline-block py-2 px-3 hover:text-blue-600 transition-colors duration-200">
                    {menu.title}
                  </Link>

                  {menu.children && menu.children.length > 0 && (
                    <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover/main:opacity-100 group-hover/main:visible transition-all duration-200 ease-in-out z-50">
                      <RecursiveMenu items={menu.children} />
                    </div>
                  )}
                </li>
              ))}
              <li>
                {isAuthReady ? (
                  <AuthButton />
                ) : (
                  // Loading state cho AuthButton
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                )}
              </li>
            </ul>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
