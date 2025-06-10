import { Box, Typography } from "@mui/material";
import CardMini from "../Common/CardMini";
import PropTypes from "prop-types";

const ListCardMini = ({ posts = [], title = "Bài viết nổi bật" }) => {
  return (
    <>
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
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}>
          {posts.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Không có bài viết nổi bật
            </Typography>
          ) : (
            posts.map((post) => (
              <CardMini
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.image_title || post.image}
              />
            ))
          )}
        </Box>
      </Box>
    </>
  );
};

ListCardMini.propTypes = {
  posts: PropTypes.array,
  title: PropTypes.string,
};

export default ListCardMini;
