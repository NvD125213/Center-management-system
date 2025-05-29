import { Box, Typography } from "@mui/material";
import CardMini from "../Common/CardMini";

// Mock data for featured posts
const featuredPosts = [
  {
    id: 1,
    title: "Modern Web Development with React & TypeScript",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Mastering Node.js for Backend Development",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Getting Started with GraphQL",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const ListCardMini = () => {
  return (
    <Box sx={{ width: "100%", display: "grid" }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
          color: "text.primary",
          borderBottom: "2px solid",
          borderColor: "primary.main",
          pb: 1,
          display: "inline-block",
        }}>
        Bài viết nổi bật
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
        {featuredPosts.map((post) => (
          <CardMini key={post.id} {...post} />
        ))}
      </Box>
    </Box>
  );
};

export default ListCardMini;
