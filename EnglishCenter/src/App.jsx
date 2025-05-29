import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { ScrollToTop } from "./components/Common/ScrollToTop";
import AppLayout from "./layouts/AppLayout";
import AboutUs from "./pages/AboutUs";
import PortalPage from "./pages/PortalPage";
import SignInForm from "./pages/Signin";
import SignUpForm from "./pages/Signup";
import { Provider } from "react-redux";
import store from "./stores/store";
import { useGetMenusQuery } from "./services/menuServices";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import BlogCard from "./components/Common/Card";
import ListCard from "./components/ListCard/ListCard";

// Component Breadcrumb
const Breadcrumb = ({ paths }) => {
  return (
    <nav className="text-sm mb-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-gray-500 hover:text-blue-600">
            Trang chủ
          </Link>
        </li>
        {paths.map((path, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            <Link
              to={path.url}
              className={`${
                index === paths.length - 1
                  ? "text-blue-600 font-medium"
                  : "text-gray-500 hover:text-blue-600"
              }`}>
              {path.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  paths: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Component để hiển thị nội dung menu
const MenuPage = () => {
  const { "*": menuPath } = useParams();
  const { data: menuData, isLoading } = useGetMenusQuery();

  // Tìm menu item dựa trên path segments
  const findMenuItemByPathSegments = (
    items,
    pathSegments,
    currentPath = "",
    breadcrumbs = []
  ) => {
    if (!items || !pathSegments.length) return null;

    const currentSegment = pathSegments[0];

    for (const item of items) {
      const itemPath = convertToSlug(item.name);
      const fullPath = currentPath
        ? `${currentPath}/${itemPath}`
        : `/${itemPath}`;

      if (itemPath === currentSegment) {
        const newBreadcrumbs = [
          ...breadcrumbs,
          { name: item.name, url: fullPath },
        ];

        if (pathSegments.length === 1) {
          return { item, breadcrumbs: newBreadcrumbs };
        }

        if (item.children && item.children.length > 0) {
          const found = findMenuItemByPathSegments(
            item.children,
            pathSegments.slice(1),
            fullPath,
            newBreadcrumbs
          );
          if (found) return found;
        }
      }
    }
    return null;
  };

  // Map các route tĩnh với path tương ứng
  const staticRoutes = {
    "ve-chung-toi/he-thong-co-so": {
      component: AboutUs,
      title: "Lịch sử hình thành",
      breadcrumb: [
        { name: "Về chúng tôi", url: "/ve-chung-toi" },
        { name: "Lịch sử hình thành", url: "/ve-chung-toi/he-thong-co-so" },
      ],
    },
    // Thêm các route tĩnh khác ở đây
    // 've-chung-toi/tam-nhin-su-menh': {
    //   component: VisionMission,
    //   title: 'Tầm nhìn sứ mệnh',
    //   breadcrumb: [...]
    // },
  };

  // Kiểm tra xem path hiện tại có phải là route tĩnh không
  const staticRoute = staticRoutes[menuPath];

  if (staticRoute) {
    const Component = staticRoute.component;
    return (
      <div className="container py-8">
        <Breadcrumb paths={staticRoute.breadcrumb} />
        <Component />
      </div>
    );
  }

  // Nếu không phải route tĩnh, xử lý như menu động
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const pathSegments = menuPath.split("/").filter(Boolean);
  const result = menuData
    ? findMenuItemByPathSegments(menuData.data, pathSegments)
    : null;

  if (!result) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Không tìm thấy trang
          </h1>
          <p className="text-gray-600">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const { item: menuItem, breadcrumbs } = result;

  // Kiểm tra xem menu item có phải là một route đặc biệt không
  const specialRoutes = {
    "ve-chung-toi": {
      component: AboutUs,
      title: "Về chúng tôi",
    },
    // Thêm các route đặc biệt khác ở đây
  };

  const specialRoute = specialRoutes[menuPath];
  if (specialRoute) {
    const Component = specialRoute.component;
    return (
      <div className="container py-8">
        <Breadcrumb paths={breadcrumbs} />
        <Component />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Breadcrumb paths={breadcrumbs} />
      <h1 className="text-3xl font-bold mb-6">{menuItem.name}</h1>
      {menuItem.children && menuItem.children.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {menuItem.children.map((child) => (
            <Link
              key={child.id}
              to={`${menuPath}/${convertToSlug(child.name)}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{child.name}</h2>
              {/* Thêm mô tả hoặc thông tin khác của menu con nếu có */}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

// Hàm chuyển đổi tên thành slug (copy từ Navbar.jsx)
const convertToSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "")
    .replace(/(\s+)/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const App = () => {
  return (
    <Provider store={store}>
      <main className="overflow-x-hidden bg-white text-dark">
        <Router>
          <ScrollToTop />
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<PortalPage />} />
              {/* Route động cho menu với path đa cấp */}
              <Route path="/*" element={<MenuPage />} />
              <Route path="/card-blog" element={<BlogCard />} />
              <Route path="/list-card" element={<ListCard />} />
            </Route>
            <Route path="/signin" element={<SignInForm />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </Router>
      </main>
    </Provider>
  );
};

export default App;
