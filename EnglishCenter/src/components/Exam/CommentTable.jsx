import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  List,
  Alert,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  useGetCommentsQuery,
  useCreateCommentMutation,
} from "../../services/commentServices";
import { useSocket } from "../../contexts/SocketContext";
import ReplyIcon from "@mui/icons-material/Reply";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

function getAllNames(comments) {
  const names = new Set();
  function traverse(list) {
    list.forEach((c) => {
      if (c.user?.full_name) names.add(c.user.full_name);
      if (c.children && c.children.length > 0) traverse(c.children);
    });
  }
  traverse(comments || []);
  return Array.from(names);
}

const stringToColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 36,
      height: 36,
      fontSize: 16,
    },
    children: name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "U",
  };
};

const CommentItem = ({
  comment,
  userId,
  isCreating,
  replyingTo,
  setReplyingTo,
  replyContent,
  setReplyContent,
  handleReplySubmit,
  level = 0,
  mentionAnchor,
  setMentionAnchor,
  mentionQuery,
  setMentionQuery,
  filteredNames,
  setFilteredNames,
  names,
  handleSelectMention,
  handleReplyInput,
}) => {
  // Chỉ cho phép reply ở cấp 0 (cha)
  const canReply = level === 0;
  return (
    <Box sx={{ ml: level * 4, mt: 2 }}>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: level === 0 ? "#f5f5f5" : "#fafafa",
          position: "relative",
        }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Avatar {...stringAvatar(comment.user?.full_name || "Ẩn danh")} />
          <Box flex={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography fontWeight="bold">
                {comment.user?.full_name || "Người dùng ẩn danh"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.create_at).toLocaleString()}
              </Typography>
            </Stack>
            {/* Hiển thị nội dung comment, nếu có mention thì tách và làm nổi bật */}
            {(() => {
              const mentionMatch = comment.content.match(/^@(\S[\S ]*?)\s+/);
              if (mentionMatch) {
                const mentionName = mentionMatch[1];
                const restContent = comment.content.replace(
                  /^@(\S[\S ]*?)\s+/,
                  ""
                );
                return (
                  <Typography sx={{ mt: 0.5, mb: 1 }}>
                    <Box
                      component="span"
                      sx={{ color: "primary.main", fontWeight: 600 }}>
                      @{mentionName}
                    </Box>{" "}
                    {restContent}
                  </Typography>
                );
              } else {
                return (
                  <Typography sx={{ mt: 0.5, mb: 1 }}>
                    {comment.content}
                  </Typography>
                );
              }
            })()}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {canReply && (
                <>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setReplyingTo(comment.id);
                      setReplyContent(
                        `@${comment.user?.full_name || "Ẩn danh"} `
                      );
                    }}
                    sx={{
                      opacity: 0.7,
                      transition: "opacity 0.2s",
                      "&:hover": { opacity: 1, color: "primary.main" },
                      p: 0.5,
                    }}>
                    <ReplyIcon fontSize="small" />
                  </IconButton>
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    Phản hồi
                  </Typography>
                </>
              )}
            </Box>
            {replyingTo === comment.id && (
              <Box
                component="form"
                onSubmit={(e) => handleReplySubmit(e, comment.id)}
                sx={{ mt: 1 }}>
                <TextField
                  size="small"
                  value={replyContent}
                  onChange={handleReplyInput}
                  placeholder="Nhập phản hồi..."
                  fullWidth
                  multiline
                  minRows={2}
                  disabled={isCreating}
                  sx={{ borderRadius: 2, bgcolor: "#fff" }}
                  inputRef={(ref) => {
                    if (replyingTo === comment.id) window.replyInputRef = ref;
                  }}
                />
                <Popper
                  open={!!mentionAnchor && filteredNames.length > 0}
                  anchorEl={mentionAnchor}
                  placement="bottom-start">
                  <Paper>
                    <MenuList>
                      {filteredNames.map((name) => (
                        <MenuItem
                          key={name}
                          onClick={() => handleSelectMention(name)}>
                          {name}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Paper>
                </Popper>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    disabled={isCreating}>
                    Gửi
                  </Button>
                  <Button size="small" onClick={() => setReplyingTo(null)}>
                    Hủy
                  </Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Stack>
      </Paper>
      {/* Render children đệ quy */}
      {comment.children && comment.children.length > 0 && (
        <List disablePadding>
          {comment.children.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              userId={userId}
              isCreating={isCreating}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleReplySubmit={handleReplySubmit}
              level={level + 1}
              mentionAnchor={mentionAnchor}
              setMentionAnchor={setMentionAnchor}
              mentionQuery={mentionQuery}
              setMentionQuery={setMentionQuery}
              filteredNames={filteredNames}
              setFilteredNames={setFilteredNames}
              names={names}
              handleSelectMention={handleSelectMention}
              handleReplyInput={handleReplyInput}
            />
          ))}
        </List>
      )}
    </Box>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isCreating: PropTypes.bool,
  replyingTo: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setReplyingTo: PropTypes.func,
  replyContent: PropTypes.string,
  setReplyContent: PropTypes.func,
  handleReplySubmit: PropTypes.func,
  level: PropTypes.number,
  mentionAnchor: PropTypes.object,
  setMentionAnchor: PropTypes.func,
  mentionQuery: PropTypes.string,
  setMentionQuery: PropTypes.func,
  filteredNames: PropTypes.array,
  setFilteredNames: PropTypes.func,
  names: PropTypes.array,
  handleSelectMention: PropTypes.func,
  handleReplyInput: PropTypes.func,
};

const CommentTable = ({ examId, userId }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [mentionAnchor, setMentionAnchor] = useState(null);
  const [mentionQuery, setMentionQuery] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const {
    data: comments,
    isLoading,
    isError,
    refetch,
  } = useGetCommentsQuery(examId, { skip: !examId });
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const socket = useSocket();

  // Lấy danh sách tên duy nhất từ comments
  const names = getAllNames(comments);

  useEffect(() => {
    if (!socket) return;
    const handleReceiveComment = (data) => {
      if (data.exam_id == examId) {
        refetch();
      }
    };
    socket.on("newComment", handleReceiveComment);
    return () => {
      socket.off("newComment", handleReceiveComment);
    };
  }, [socket, examId, refetch]);

  // Gửi comment cha
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!content.trim()) {
      setError("Nội dung không được để trống");
      return;
    }
    try {
      await createComment({
        user_id: userId,
        exam_id: Number(examId),
        content,
        parent_id: null,
      }).unwrap();
      setContent("");
      refetch();
    } catch (err) {
      setError("Gửi bình luận thất bại");
    }
  };

  // Gửi reply (comment con)
  const handleReplySubmit = async (e, parentId) => {
    e.preventDefault();
    setError("");
    if (!replyContent.trim()) {
      setError("Nội dung phản hồi không được để trống");
      return;
    }
    try {
      await createComment({
        user_id: userId,
        exam_id: examId,
        content: replyContent,
        parent_id: parentId,
      }).unwrap();
      setReplyContent("");
      setReplyingTo(null);
      setMentionAnchor(null);
      setMentionQuery("");
      setFilteredNames([]);
      refetch();
    } catch (err) {
      setError("Gửi phản hồi thất bại");
    }
  };

  // Xử lý input khi nhập reply để gợi ý mention
  const handleReplyInput = (e) => {
    const value = e.target.value;
    setReplyContent(value);
    // Tìm vị trí @ gần nhất trước con trỏ
    const cursor = e.target.selectionStart;
    const textBefore = value.slice(0, cursor);
    const match = textBefore.match(/@([\w\s]*)$/);
    if (match) {
      setMentionQuery(match[1]);
      setMentionAnchor(e.target);
      setFilteredNames(
        names.filter((n) => n.toLowerCase().includes(match[1].toLowerCase()))
      );
    } else {
      setMentionAnchor(null);
      setMentionQuery("");
      setFilteredNames([]);
    }
  };

  // Chèn tên mention vào vị trí con trỏ
  const handleSelectMention = (name) => {
    const textarea = mentionAnchor;
    if (!textarea) return;
    const cursor = textarea.selectionStart;
    const value = replyContent;
    const textBefore = value.slice(0, cursor);
    const textAfter = value.slice(cursor);
    const match = textBefore.match(/@([\w\s]*)$/);
    if (match) {
      const newText =
        textBefore.slice(0, match.index) + "@" + name + " " + textAfter;
      setReplyContent(newText);
      setMentionAnchor(null);
      setMentionQuery("");
      setFilteredNames([]);
      // Đặt lại con trỏ sau tên vừa chèn
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          match.index + name.length + 2,
          match.index + name.length + 2
        );
      }, 0);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mt: 4,
        bgcolor: "#f0f2f5",
        maxHeight: "700px",
        overflow: "auto",
      }}>
      <Typography variant="h6" gutterBottom>
        Bình luận
      </Typography>
      {/* Form gửi comment cha */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Nhập bình luận"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            disabled={isCreating}
            sx={{ borderRadius: 2, bgcolor: "#fff" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isCreating}
            sx={{ minWidth: 120, borderRadius: 2 }}>
            {isCreating ? <CircularProgress size={20} /> : "Gửi"}
          </Button>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
      </form>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <Alert severity="error">Không thể tải bình luận</Alert>
      ) : (
        <List>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                userId={userId}
                isCreating={isCreating}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                handleReplySubmit={handleReplySubmit}
                level={0}
                mentionAnchor={mentionAnchor}
                setMentionAnchor={setMentionAnchor}
                mentionQuery={mentionQuery}
                setMentionQuery={setMentionQuery}
                filteredNames={filteredNames}
                setFilteredNames={setFilteredNames}
                names={names}
                handleSelectMention={handleSelectMention}
                handleReplyInput={handleReplyInput}
              />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Chưa có bình luận nào.
            </Typography>
          )}
        </List>
      )}
    </Paper>
  );
};

CommentTable.propTypes = {
  examId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CommentTable;
