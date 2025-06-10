import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MdAccessTime } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { createSlug } from "../../utils/stringUtils";

const theme = createTheme({
  palette: {
    primary: { main: "#6366f1" },
    secondary: { main: "#ec4899" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const BlogCard = ({ id, title, image_title, description, create_at }) => {
  const [hovered, setHovered] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = createSlug(title);
    navigate(`/blog/detail/${id}/${slug}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Fade in timeout={800}>
        <Card
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            cursor: "pointer",
            width: "100%",
            maxWidth: "800px",
            borderRadius: 2,
            boxShadow: hovered
              ? "0 15px 30px -12px rgba(0, 0, 0, 0.25)"
              : "0 8px 15px -5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #6366f1, #ec4899, #06b6d4)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            },
          }}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              flex: "0 0 35%",
              minWidth: "250px",
              height: "auto",
            }}>
            <CardMedia
              component="img"
              sx={{
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
              image={image_title}
              alt={title}
            />
          </Box>

          <Box
            sx={{
              flex: "0 0 65%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <CardContent sx={{ padding: 2, flex: 1 }}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 700,
                  lineHeight: 1.3,
                  marginBottom: 2,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                {title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6, marginBottom: 2, fontSize: "0.95rem" }}>
                {description}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MdAccessTime />
                <Typography variant="caption" color="text.secondary">
                  {create_at}
                </Typography>
              </Box>
            </CardContent>
          </Box>
        </Card>
      </Fade>
    </ThemeProvider>
  );
};

BlogCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image_title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  create_at: PropTypes.string.isRequired,
};

export default BlogCard;
