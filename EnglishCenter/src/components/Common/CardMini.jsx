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

const theme = createTheme({
  palette: {
    primary: { main: "#6366f1" },
    secondary: { main: "#ec4899" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const CardMini = ({ title, image }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Fade in timeout={800}>
        <Card
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: 2,
            boxShadow: hovered
              ? "0 10px 20px -8px rgba(0, 0, 0, 0.2)"
              : "0 4px 10px -5px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
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
              height: "3px",
              background: "linear-gradient(90deg, #6366f1, #ec4899)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            },
          }}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              flex: "0 0 120px",
              height: "120px",
            }}>
            <CardMedia
              component="img"
              sx={{
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
                transform: hovered ? "scale(1.05)" : "scale(1)",
              }}
              image={image}
              alt={title}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
            <CardContent sx={{ padding: 1.5, flex: 1 }}>
              <Typography
                gutterBottom
                variant="subtitle2"
                component="h3"
                sx={{
                  fontWeight: 400, // Non-bold
                  fontSize: "0.875rem", // Smaller font
                  lineHeight: 1.3,
                  marginBottom: 1,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}>
                {title}
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Fade>
    </ThemeProvider>
  );
};

CardMini.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string,
  create_at: PropTypes.string,
  views: PropTypes.number,
};

CardMini.defaultProps = {
  description: "",
  create_at: "",
  views: 0,
};

export default CardMini;
