import { Box, Paper } from "@mui/material";
import PropTypes from "prop-types";

const DetailElement = ({ elements }) => {
  if (!elements || elements.length === 0) return null;

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
                src={element.url}
                alt={`Element ${index + 1}`}
                sx={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 1,
                }}
              />
            )}
            {element.type === "audio" && (
              <audio controls src={element.url} style={{ width: "100%" }} />
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
      content: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
};

export default DetailElement;
