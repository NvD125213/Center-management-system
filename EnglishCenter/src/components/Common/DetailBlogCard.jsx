import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Container,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import { MdAccessTime, MdPerson } from "react-icons/md";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

const DetailBlogCard = ({ blog }) => {
  if (!blog) return null;

  const sanitizedContent = DOMPurify.sanitize(blog.content);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              lineHeight: 1.3,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            {blog.title}
          </Typography>

          {/* Meta Information */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 3,
              flexWrap: "wrap",
            }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MdPerson size={20} />
              <Typography variant="body2" color="text.secondary">
                {blog.user?.full_name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MdAccessTime size={20} />
              <Typography variant="body2" color="text.secondary">
                {new Date(blog.create_at).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
            {blog.menu && (
              <Chip
                label={blog.menu.name}
                size="small"
                sx={{
                  bgcolor: "primary.light",
                  color: "white",
                  "&:hover": { bgcolor: "primary.main" },
                }}
              />
            )}
          </Box>

          {/* Featured Image */}
          {blog.image_title && (
            <Card sx={{ mb: 4, borderRadius: 2, overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={blog.image_title}
                alt={blog.title}
                sx={{
                  width: "100%",
                  height: { xs: "250px", md: "400px" },
                  objectFit: "cover",
                }}
              />
            </Card>
          )}

          {/* Description */}
          {blog.description && (
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: "text.secondary",
                fontStyle: "italic",
                borderLeft: "4px solid",
                borderColor: "primary.main",
                pl: 2,
              }}>
              {blog.description}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Content Section */}
        <Box
          className="blog-content"
          sx={{
            "& img": {
              maxWidth: "100%",
              height: "auto",
              borderRadius: 1,
              my: 2,
            },
            "& p": {
              mb: 2,
              lineHeight: 1.8,
              fontSize: "1.1rem",
            },
            "& h2, & h3, & h4": {
              mt: 4,
              mb: 2,
              fontWeight: 600,
            },
            "& ul, & ol": {
              pl: 4,
              mb: 2,
            },
            "& li": {
              mb: 1,
            },
            "& blockquote": {
              borderLeft: "4px solid",
              borderColor: "primary.main",
              pl: 2,
              py: 1,
              my: 2,
              bgcolor: "grey.50",
            },
          }}>
          {parse(sanitizedContent)}
        </Box>
      </Paper>
    </Container>
  );
};

DetailBlogCard.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    description: PropTypes.string,
    image_title: PropTypes.string,
    create_at: PropTypes.string.isRequired,
    user: PropTypes.shape({
      full_name: PropTypes.string,
    }),
    menu: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailBlogCard;
