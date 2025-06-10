import {
  Box,
  Pagination,
  CircularProgress,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import BlogCard from "../Common/Card";
import ListCardMini from "./ListCardMini";
import {
  useGetBlogForMenuQuery,
  useGetTopViewedQuery,
  useGetRecentBlogQuery,
} from "../../services/blogServices";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import Hero from "../Hero/Hero";
import { format, parseISO, addHours } from "date-fns";
import { vi } from "date-fns/locale";

// Hàm chuyển đổi ngày tháng
const formatDate = (dateString) => {
  if (!dateString) return "";

  try {
    // Kiểm tra nếu dateString đã được format
    if (typeof dateString === "string" && dateString.includes("tháng")) {
      return dateString;
    }

    // Parse ISO string và chuyển đổi sang múi giờ Việt Nam (UTC+7)
    const date = addHours(parseISO(dateString), 7);
    return format(date, "d 'tháng' M 'năm' yyyy, HH:mm", { locale: vi });
  } catch (error) {
    console.error("Lỗi định dạng ngày tháng:", error, "Input:", dateString);
    return dateString;
  }
};

const ListCard = () => {
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const limit = itemsPerPage;

  // Lấy đường dẫn URL hiện tại
  const fullPath = location.pathname;

  // Phân tích URL để xác định loại trang và slug
  let isBlogHome = false;
  let slug = "";
  let detailId = "";

  if (fullPath === "/blog/menu" || fullPath === "/blog/menu/") {
    isBlogHome = true;
  } else if (fullPath.startsWith("/blog/menu/")) {
    const slugMatch = fullPath.match(/\/blog\/menu\/(.+)/);
    if (slugMatch) slug = slugMatch[1];
  } else if (fullPath.startsWith("/blog/detail/")) {
    const detailMatch = fullPath.match(/\/blog\/detail\/(\d+)\/(.+)/);
    if (detailMatch) {
      detailId = detailMatch[1];
      slug = detailMatch[2];
    }
  }

  // Encode slug (nếu có)
  const encodedSlug = slug ? slug.replace(/\//g, "%2F") : "";

  // Tạo breadcrumb
  const getBreadcrumbItems = () => {
    const items = [
      { name: "Trang chủ", url: "/" },
      { name: "Blog", url: "/blog" },
    ];

    if (isBlogHome) {
      items.push({ name: "Menu", url: "/blog/menu" });
    } else if (fullPath.startsWith("/blog/menu/") && slug) {
      const slugParts = slug.split("/");
      let currentPath = "/blog/menu";
      slugParts.forEach((part) => {
        currentPath += `/${part}`;
        items.push({
          name: part
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          url: currentPath,
        });
      });
    } else if (fullPath.startsWith("/blog/detail/") && detailId && slug) {
      items.push({
        name: "Chi tiết",
        url: `/blog/detail/${detailId}/${slug}`,
      });
    }

    return items;
  };

  // Gọi API để lấy danh sách bài viết
  const {
    data: blogData,
    isLoading,
    error,
    isFetching,
  } = useGetBlogForMenuQuery({
    slug: encodedSlug, // Cho trang chủ truyền ''
    page,
    limit,
  });

  // Gọi API bài viết nổi bật
  const { data: topViewedData, isLoading: isLoadingTopViewed } =
    useGetTopViewedQuery();
  const { data: recentBlogData, isLoading: isLoadingRecentBlog } =
    useGetRecentBlogQuery();

  // Reset page khi slug thay đổi
  useEffect(() => {
    setPage(1);
  }, [slug]);

  const breadcrumbPaths = getBreadcrumbItems();

  // Xử lý chuyển trang
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  console.log(">>> recentBlogData", recentBlogData);

  return (
    <>
      <Hero title="Danh sách bài viết" breadcrumbPaths={breadcrumbPaths} />
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: 3,
        }}>
        {/* Loading state */}
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {/* Error state */}
        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error.data?.message || "Có lỗi xảy ra khi tải dữ liệu"}
          </Alert>
        )}

        {/* Content */}
        {blogData && (
          <>
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "3fr 1fr",
                gap: 3,
                mt: 3,
              }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  position: "relative",
                }}>
                {/* Loading overlay */}
                {isFetching && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      bgcolor: "rgba(255, 255, 255, 0.7)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 1,
                    }}>
                    <CircularProgress />
                  </Box>
                )}

                {/* No data */}
                {blogData.data.length === 0 ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "400px",
                      width: "100%",
                      bgcolor: "#f8f9fa",
                      borderRadius: 4,
                      p: 6,
                      my: 4,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                    }}>
                    <SearchOffIcon
                      sx={{
                        fontSize: "100px",
                        color: "#90caf9",
                        mb: 3,
                        animation: "float 3s ease-in-out infinite",
                        "@keyframes float": {
                          "0%": { transform: "translateY(0px)" },
                          "50%": { transform: "translateY(-20px)" },
                          "100%": { transform: "translateY(0px)" },
                        },
                      }}
                    />
                    <Typography
                      variant="h4"
                      sx={{
                        color: "#1976d2",
                        fontWeight: 600,
                        mb: 2,
                        textAlign: "center",
                      }}>
                      Không tìm thấy bài viết nào
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#666",
                        textAlign: "center",
                        maxWidth: "500px",
                        mb: 3,
                      }}>
                      Hiện tại chưa có bài viết nào trong menu này. Hãy quay lại
                      sau nhé!
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexWrap: "wrap",
                        justifyContent: "center",
                      }}>
                      <Alert
                        severity="info"
                        sx={{
                          width: "auto",
                          borderRadius: 2,
                          "& .MuiAlert-icon": {
                            fontSize: "1.5rem",
                          },
                        }}>
                        Bạn có thể thử tìm kiếm ở menu khác
                      </Alert>
                    </Box>
                  </Box>
                ) : (
                  blogData.data.map((item, index) => {
                    const formattedCreatedAt = formatDate(item.create_at);

                    return (
                      <BlogCard
                        key={item.id || index}
                        id={item.id}
                        title={item.title}
                        image_title={item.image_title}
                        description={item.description}
                        create_at={formattedCreatedAt}
                      />
                    );
                  })
                )}

                {/* Pagination */}
                {blogData.pagination.total > 0 && (
                  <Box sx={{ mt: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        padding: 2,
                      }}>
                      <Typography variant="body2" color="text.secondary">
                        Hiển thị {blogData.pagination.limit} bài viết
                      </Typography>
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Pagination
                          count={blogData.pagination.totalPages}
                          page={blogData.pagination.page}
                          onChange={handlePageChange}
                          color="primary"
                          size="large"
                          showFirstButton
                          showLastButton
                        />
                      </Box>
                      <FormControl
                        size="small"
                        sx={{ minWidth: 120, marginRight: "30px" }}>
                        <InputLabel>Hiển thị</InputLabel>
                        <Select
                          value={itemsPerPage}
                          label="Hiển thị"
                          onChange={handleItemsPerPageChange}>
                          <MenuItem value={10}>10 bài</MenuItem>
                          <MenuItem value={20}>20 bài</MenuItem>
                          <MenuItem value={50}>50 bài</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Sidebar */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <ListCardMini
                  posts={topViewedData?.data || []}
                  title="Nhiều người quan tâm"
                />
                <ListCardMini
                  posts={recentBlogData?.data || []}
                  title="Bài viết gần đây"
                />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default ListCard;
