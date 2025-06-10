import { useParams } from "react-router-dom";
import { Box, CircularProgress, Alert, Container } from "@mui/material";
import DetailBlogCard from "../components/Common/DetailBlogCard";
import ListCardMini from "../components/ListCard/ListCardMini";
import {
  useGetBlogByIdQuery,
  useGetTopViewedQuery,
  useGetRecentBlogQuery,
} from "../services/blogServices";
import Hero from "../components/Hero/Hero";

const getBreadcrumbItems = (id, slug) => {
  const items = [
    { name: "Trang chủ", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Detail", url: "/detail" },
  ];

  if (slug) {
    const slugParts = slug.split("/");
    let currentPath = `/blog/detail/${id}`;

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
  }

  return items;
};

const BlogDetail = () => {
  const { id, slug } = useParams();
  const { data: blog, isLoading, error } = useGetBlogByIdQuery(Number(id));
  const { data: topViewedData, isLoading: isLoadingTopViewed } =
    useGetTopViewedQuery();
  const { data: recentBlogData, isLoading: isLoadingRecentBlog } =
    useGetRecentBlogQuery();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">
          {error?.data?.message || "Có lỗi xảy ra khi tải bài viết"}
        </Alert>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="warning">Không tìm thấy bài viết</Alert>
      </Box>
    );
  }
  const breadcrumbPaths = getBreadcrumbItems(id, slug);

  return (
    <>
      <Hero title="Chi tiết bài viết" breadcrumbPaths={breadcrumbPaths} />
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}>
          {/* Main content - 70% */}
          <Box sx={{ flex: "0 0 70%" }}>
            <DetailBlogCard blog={blog} />
          </Box>

          {/* Sidebar - 30% */}
          <Box
            sx={{ flex: "0 0 30%", paddingRight: "20px", paddingTop: "50px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <ListCardMini
                posts={topViewedData?.data || []}
                title="Bài viết nổi bật"
              />
              <ListCardMini
                posts={recentBlogData?.data || []}
                title="Nhiều người quan tâm"
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default BlogDetail;
