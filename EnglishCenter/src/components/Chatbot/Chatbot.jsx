import { useState, useRef, useEffect } from "react";
import { useSocket } from "../../contexts/SocketContext";
import {
  Fab,
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Close as CloseIcon,
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  MoreHoriz as MoreIcon,
  Phone as PhoneIcon,
  VideoCall as VideoIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAskAiAgentMutation } from "../../services/aiServices";

const ChatButton = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 1000,
  transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  background: "linear-gradient(135deg, #0084FF 0%, #00A3FF 100%)",
  boxShadow: "0 4px 20px rgba(0, 132, 255, 0.3)",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 25px rgba(0, 132, 255, 0.4)",
    background: "linear-gradient(135deg, #0073E6 0%, #0092E6 100%)",
  },
}));

const ChatWindow = styled(Paper)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(12),
  right: theme.spacing(3),
  width: 380,
  height: 620,
  display: "flex",
  flexDirection: "column",
  zIndex: 1000,
  borderRadius: "20px",
  overflow: "hidden",
  background: "#FFFFFF",
  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.04)",
  border: "1px solid rgba(0, 0, 0, 0.08)",
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  background: "linear-gradient(135deg, #0084FF 0%, #00A3FF 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    zIndex: -1,
  },
}));

const ChatMessages = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: "auto",
  padding: theme.spacing(1, 1.5),
  background: "#F8F9FA",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(0, 0, 0, 0.2)",
    borderRadius: "2px",
  },
}));

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(0.25),

  maxWidth: "85%",
  alignSelf: isUser ? "flex-end" : "flex-start",
  justifyContent: isUser ? "flex-end" : "flex-start",
}));

const MessageContent = styled(Box)(({ theme, isUser }) => ({
  background: isUser
    ? "linear-gradient(135deg, #0084FF 0%, #00A3FF 100%)"
    : "#FFFFFF",
  color: isUser ? "#FFFFFF" : "#1C1E21",
  padding: theme.spacing(1, 1.5),
  borderRadius: "18px",
  maxWidth: "100%",
  wordBreak: "break-word",
  fontSize: "15px",
  lineHeight: 1.4,
  boxShadow: isUser
    ? "0 2px 8px rgba(0, 132, 255, 0.3)"
    : "0 1px 3px rgba(0, 0, 0, 0.1)",
  position: "relative",
  border: isUser ? "none" : "1px solid rgba(0, 0, 0, 0.05)",
}));

const MessageAvatar = styled(Avatar)(({ theme }) => ({
  width: 28,
  height: 28,
  background: "linear-gradient(135deg, #0084FF 0%, #00A3FF 100%)",
  fontSize: "14px",
  boxShadow: "0 2px 8px rgba(0, 132, 255, 0.3)",
}));

const ChatInput = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  background: "#FFFFFF",
  borderTop: "1px solid rgba(0, 0, 0, 0.08)",
  display: "flex",
  alignItems: "flex-end",
  gap: theme.spacing(1),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    background: "#F0F2F5",
    borderRadius: "20px",
    fontSize: "15px",
    border: "none",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "#E4E6EA",
    },
    "&.Mui-focused": {
      background: "#FFFFFF",
      boxShadow: "0 0 0 2px rgba(0, 132, 255, 0.2)",
    },
    "& fieldset": {
      border: "none",
    },
    "& textarea": {
      padding: theme.spacing(1.25, 1.5),
      maxHeight: "100px",
      "&::placeholder": {
        color: "#65676B",
        opacity: 1,
      },
    },
  },
}));

const SendButton = styled(IconButton)(({ theme }) => ({
  background: "linear-gradient(135deg, #0084FF 0%, #00A3FF 100%)",
  color: "#FFFFFF",
  width: 36,
  height: 36,
  boxShadow: "0 2px 8px rgba(0, 132, 255, 0.3)",
  transition: "all 0.2s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #0073E6 0%, #0092E6 100%)",
    transform: "scale(1.05)",
    boxShadow: "0 4px 12px rgba(0, 132, 255, 0.4)",
  },
  "&.Mui-disabled": {
    background: "#BEC3C9",
    color: "#FFFFFF",
    boxShadow: "none",
  },
}));

const HeaderActions = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const HeaderButton = styled(IconButton)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.9)",
  padding: theme.spacing(0.75),
  "&:hover": {
    background: "rgba(255, 255, 255, 0.1)",
    color: "#FFFFFF",
  },
}));

const TimeStamp = styled(Typography)(({ theme, isUser }) => ({
  fontSize: "11px",
  color: "#8A8D91",
  marginTop: theme.spacing(0.25),
  textAlign: "center",
  opacity: 0.7,
}));

const OnlineStatus = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  background: "#42B883",
  borderRadius: "50%",
  border: "2px solid #FFFFFF",
  position: "absolute",
  bottom: 0,
  right: 0,
}));

const TypingIndicator = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(1, 1.5),
  background: "#FFFFFF",
  borderRadius: "18px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  "& .typing-dots": {
    display: "flex",
    gap: "3px",
    "& span": {
      width: "6px",
      height: "6px",
      background: "#8A8D91",
      borderRadius: "50%",
      animation: "typing 1.4s infinite ease-in-out",
      "&:nth-child(1)": { animationDelay: "0s" },
      "&:nth-child(2)": { animationDelay: "0.2s" },
      "&:nth-child(3)": { animationDelay: "0.4s" },
    },
  },
  "@keyframes typing": {
    "0%, 60%, 100%": { transform: "translateY(0)" },
    "30%": { transform: "translateY(-10px)" },
  },
}));

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Xin chào! Tôi là trợ lý ảo EZ English. Tôi có thể giúp bạn học tiếng Anh hiệu quả hơn. Bạn cần hỗ trợ gì?",
      isUser: false,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const socket = useSocket();
  const [askAiAgent] = useAskAiAgentMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      {
        text: userMessage,
        isUser: true,
        timestamp: new Date().toISOString(),
      },
    ]);

    try {
      const response = await askAiAgent({ question: userMessage }).unwrap();

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          text: response.answer,
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);

      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <ChatButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label="chat"
        size="medium">
        {isOpen ? <CloseIcon /> : <ChatIcon />}
      </ChatButton>

      {isOpen && (
        <ChatWindow elevation={0}>
          <ChatHeader>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box sx={{ position: "relative" }}>
                <MessageAvatar>
                  <BotIcon sx={{ fontSize: "16px" }} />
                </MessageAvatar>
                <OnlineStatus />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    lineHeight: 1.2,
                  }}>
                  EZ English Assistant
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "rgba(255, 255, 255, 0.8)",
                    lineHeight: 1,
                  }}>
                  Hoạt động 2 phút trước
                </Typography>
              </Box>
            </Box>
            <HeaderActions>
              <HeaderButton size="small">
                <PhoneIcon sx={{ fontSize: "18px" }} />
              </HeaderButton>
              <HeaderButton size="small">
                <VideoIcon sx={{ fontSize: "18px" }} />
              </HeaderButton>
              <HeaderButton size="small" onClick={() => setIsOpen(false)}>
                <CloseIcon sx={{ fontSize: "18px" }} />
              </HeaderButton>
            </HeaderActions>
          </ChatHeader>

          <ChatMessages>
            {messages.map((message, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <MessageBubble isUser={message.isUser}>
                  {!message.isUser && (
                    <MessageAvatar>
                      <BotIcon sx={{ fontSize: "14px" }} />
                    </MessageAvatar>
                  )}
                  <MessageContent isUser={message.isUser}>
                    {message.text}
                  </MessageContent>
                  {message.isUser && (
                    <MessageAvatar>
                      <PersonIcon sx={{ fontSize: "14px" }} />
                    </MessageAvatar>
                  )}
                </MessageBubble>
                {index === messages.length - 1 && (
                  <TimeStamp isUser={message.isUser}>
                    {new Date(message.timestamp).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </TimeStamp>
                )}
              </Box>
            ))}

            {isLoading && (
              <MessageBubble isUser={false}>
                <MessageAvatar>
                  <BotIcon sx={{ fontSize: "14px" }} />
                </MessageAvatar>
                <TypingIndicator>
                  <Box className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </Box>
                  <Typography sx={{ fontSize: "13px", color: "#8A8D91" }}>
                    Đang nhập...
                  </Typography>
                </TypingIndicator>
              </MessageBubble>
            )}
            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInput>
            <StyledTextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Aa"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
              disabled={isLoading}
            />
            <SendButton
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="small">
              {isLoading ? (
                <CircularProgress
                  size={18}
                  thickness={4}
                  sx={{ color: "#FFFFFF" }}
                />
              ) : (
                <SendIcon sx={{ fontSize: "16px" }} />
              )}
            </SendButton>
          </ChatInput>
        </ChatWindow>
      )}
    </>
  );
};

export default Chatbot;
