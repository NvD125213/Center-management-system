import { Box, Paper } from "@mui/material";
import PropTypes from "prop-types";

const DetailElement = ({ elements }) => {
  if (!elements || elements.length === 0) return null;

  // Hàm helper để xử lý URL audio
  const getAudioUrl = (element) => {
    let url = "";

    // Nếu element có url, sử dụng url
    if (element.url) {
      url = element.url;
    }
    // Nếu element có content và content là URL, sử dụng content
    else if (
      element.content &&
      (element.content.startsWith("/") || element.content.startsWith("http"))
    ) {
      url = element.content;
    }
    // Fallback về content nếu không có url
    else {
      url = element.content;
    }

    // Nếu URL bắt đầu bằng /uploads/, thêm base URL
    if (url && url.startsWith("/uploads/")) {
      return `https://envidi.io.vn${url}`;
    }

    return url;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
        {elements.map((element, index) => (
          <Box key={index}>
            {element.type === "image" && (
              <Box
                component="img"
                src={element.url || element.content}
                alt={`Element ${index + 1}`}
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 1,
                }}
              />
            )}
            {element.type === "audio" && (
              <audio
                controls
                src={getAudioUrl(element)}
                style={{ width: "100%" }}
                onError={(e) => {
                  console.error("Audio loading error:", e);
                }}
              />
            )}
            {element.type === "text" && (
              <Box sx={{ typography: "body1" }}>{element.content}</Box>
            )}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

DetailElement.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["text", "image", "audio"]).isRequired,
      content: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

export default DetailElement;
