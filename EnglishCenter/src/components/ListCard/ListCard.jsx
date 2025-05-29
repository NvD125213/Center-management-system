import { Box } from "@mui/material";
import BlogCard from "../Common/Card";
import Breadcrumb from "../Common/Breadcrumb";
import ListCardMini from "./ListCardMini";
// Mock data list
const blogPosts = [
  {
    id: 1,
    title: "Modern Web Development with React & TypeScript",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Khám phá những kỹ thuật tiên tiến trong phát triển web hiện đại. Từ React hooks đến TypeScript patterns, bài viết này sẽ giúp bạn nâng cao kỹ năng lập trình của mình.",
    create_at: "29 tháng 5, 2025",
  },
  {
    id: 1,
    title: "Modern Web Development with React & TypeScript",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Khám phá những kỹ thuật tiên tiến trong phát triển web hiện đại. Từ React hooks đến TypeScript patterns, bài viết này sẽ giúp bạn nâng cao kỹ năng lập trình của mình.",
    create_at: "29 tháng 5, 2025",
  },
  {
    id: 1,
    title: "Modern Web Development with React & TypeScript",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Khám phá những kỹ thuật tiên tiến trong phát triển web hiện đại. Từ React hooks đến TypeScript patterns, bài viết này sẽ giúp bạn nâng cao kỹ năng lập trình của mình.",
    create_at: "29 tháng 5, 2025",
  },
  {
    id: 1,
    title: "Modern Web Development with React & TypeScript",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Khám phá những kỹ thuật tiên tiến trong phát triển web hiện đại. Từ React hooks đến TypeScript patterns, bài viết này sẽ giúp bạn nâng cao kỹ năng lập trình của mình.",
    create_at: "29 tháng 5, 2025",
  },
  {
    id: 1,
    title: "Modern Web Development with React & TypeScript",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Khám phá những kỹ thuật tiên tiến trong phát triển web hiện đại. Từ React hooks đến TypeScript patterns, bài viết này sẽ giúp bạn nâng cao kỹ năng lập trình của mình.",
    create_at: "29 tháng 5, 2025",
  },
  {
    id: 1,
    title: "Modern Web Development with React & TypeScript",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description:
      "Khám phá những kỹ thuật tiên tiến trong phát triển web hiện đại. Từ React hooks đến TypeScript patterns, bài viết này sẽ giúp bạn nâng cao kỹ năng lập trình của mình.",
    create_at: "29 tháng 5, 2025",
  },
];

const ListCard = () => {
  const breadcrumbPaths = [
    { name: "Trang chủ", url: "/" },
    { name: "Blog", url: "/list-card" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 3,
      }}>
      <Breadcrumb paths={breadcrumbPaths} />
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "3fr 1fr", // 8/2 tương đương 4/1
          gap: 3,
          mt: 3,
        }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {blogPosts.map((item, index) => (
            <BlogCard key={index} {...item} />
          ))}
        </Box>
        <Box>
          <ListCardMini />
          <ListCardMini />
        </Box>
      </Box>
    </Box>
  );
};

export default ListCard;
