import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { signInWithPopup } from "firebase/auth";
import { auth, providerGG } from "../utils/firebase";
import {
  useGoogleSignInMutation,
  useGetCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../services/authServices";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCredentials } from "../stores/authSlice";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const MotionBox = motion(Box);

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  margin: "auto",
  borderRadius: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    maxWidth: "600px",
    padding: theme.spacing(4),
  },
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  boxShadow: theme.shadows[4],
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.05
  )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at 50% 0%, ${alpha(
      theme.palette.primary.main,
      0.1
    )} 0%, transparent 50%)`,
    zIndex: -1,
  },
}));

const SocialButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.75),
  borderRadius: theme.spacing(1.5),
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 500,
  transition: "all 0.3s ease-in-out",
  borderColor: alpha(theme.palette.divider, 0.2),
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: "blur(10px)",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.background.paper, 0.9),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1.5),
    transition: "all 0.3s ease-in-out",
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    backdropFilter: "blur(10px)",
    "&:hover": {
      backgroundColor: alpha(theme.palette.background.paper, 0.9),
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
    },
    "&.Mui-focused": {
      backgroundColor: alpha(theme.palette.background.paper, 1),
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: 2,
      },
    },
  },
  "& .MuiInputLabel-root": {
    transition: "all 0.2s ease-in-out",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.main,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.75),
  borderRadius: theme.spacing(1.5),
  textTransform: "none",
  fontSize: "1.1rem",
  fontWeight: 600,
  transition: "all 0.3s ease-in-out",
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${alpha(
    theme.palette.primary.main,
    0.8
  )} 100%)`,
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  },
  "&:disabled": {
    background: theme.palette.action.disabledBackground,
    transform: "none",
    boxShadow: "none",
  },
}));

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <path
      fill="#1877F2"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </svg>
);

export default function SignUpForm() {
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [phoneError, setPhoneError] = React.useState(false);
  const [phoneErrorMessage, setPhoneErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [googleSignIn] = useGoogleSignInMutation();
  const [login] = useLoginMutation();
  const [registerUser] = useRegisterMutation();
  const { refetch: refetchCurrentUser } = useGetCurrentUserQuery();

  const validateInputs = () => {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const phone = document.getElementById("phone");

    let isValid = true;

    if (!name.value || name.value.trim().length < 2) {
      setNameError(true);
      setNameErrorMessage("Tên phải có ít nhất 2 ký tự");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Vui lòng nhập địa chỉ email hợp lệ");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Mật khẩu phải có ít nhất 6 ký tự");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    // Vietnamese phone number validation
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phone.value) {
      setPhoneError(true);
      setPhoneErrorMessage("Số điện thoại là bắt buộc");
      isValid = false;
    } else if (!phoneRegex.test(phone.value)) {
      setPhoneError(true);
      setPhoneErrorMessage("Số điện thoại không hợp lệ. Ví dụ: 0987654321");
      isValid = false;
    } else {
      setPhoneError(false);
      setPhoneErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    const data = new FormData(event.currentTarget);

    try {
      // Register the user
      await registerUser({
        full_name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        phone_number: data.get("phone"),
        role: 5,
      }).unwrap();

      // Try to login after successful registration
      try {
        const loginResponse = await login({
          email: data.get("email"),
          password: data.get("password"),
        }).unwrap();

        // Store tokens
        Cookies.set("access_token", loginResponse.access_token);
        Cookies.set("refresh_token", loginResponse.refresh_token);

        await refetchCurrentUser();
        dispatch(setCredentials(loginResponse.user));

        toast.success("Đăng ký và đăng nhập thành công!");
        navigate("/");
      } catch (loginError) {
        console.error("Login after registration failed:", loginError);
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Đăng ký thất bại!";

      if (error.data?.message) {
        errorMessage = error.data.message;
      } else if (Array.isArray(error.data)) {
        // Handle validation errors array
        const messages = error.data.map((err) => err.msg);
        errorMessage = messages.join(", ");
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, providerGG);
      const { user } = result;
      const idToken = await user.getIdToken();

      const response = await googleSignIn({ idToken }).unwrap();

      Cookies.set("access_token", response.access_token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refresh_token", response.refresh_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      await refetchCurrentUser();
      dispatch(setCredentials(response.user));

      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      console.error("Google sign in error:", error);
      let errorMessage = "Đăng nhập thất bại!";

      if (error.data?.message) {
        errorMessage = error.data.message;
      } else {
        switch (error.code) {
          case "auth/operation-not-allowed":
            errorMessage =
              "Đăng nhập bằng Google chưa được bật. Vui lòng liên hệ admin.";
            break;
          case "auth/popup-blocked":
            errorMessage =
              "Popup đăng nhập bị chặn. Vui lòng cho phép popup cho trang web này.";
            break;
          case "auth/popup-closed-by-user":
            errorMessage = "Bạn đã đóng cửa sổ đăng nhập. Vui lòng thử lại.";
            break;
          default:
            errorMessage = error.message || "Đăng nhập thất bại!";
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignUpContainer
      direction="column"
      justifyContent="center"
      alignItems="center">
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ width: "100%", maxWidth: "600px" }}>
        <Card>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: "primary.main",
              mb: 0.5,
            }}>
            Tạo tài khoản mới
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              mb: 2,
            }}>
            Đăng ký để bắt đầu học tập
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel htmlFor="name" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Họ và tên
                </FormLabel>
                <StyledTextField
                  error={nameError}
                  helperText={nameErrorMessage}
                  id="name"
                  name="name"
                  placeholder="Nhập họ và tên của bạn"
                  autoComplete="name"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={nameError ? "error" : "primary"}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Email
                </FormLabel>
                <StyledTextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? "error" : "primary"}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="phone" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Số điện thoại
                </FormLabel>
                <StyledTextField
                  error={phoneError}
                  helperText={phoneErrorMessage}
                  id="phone"
                  name="phone"
                  placeholder="0987654321"
                  autoComplete="tel"
                  required
                  fullWidth
                  variant="outlined"
                  color={phoneError ? "error" : "primary"}
                  inputProps={{
                    maxLength: 10,
                    pattern: "^(0[3|5|7|8|9])+([0-9]{8})$",
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password" sx={{ mb: 0.5, fontWeight: 500 }}>
                  Mật khẩu
                </FormLabel>
                <StyledTextField
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  name="password"
                  placeholder="••••••"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? "error" : "primary"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: "text.secondary" }}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Stack>

            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 1 }}>
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </SubmitButton>
          </Box>

          <Stack spacing={1.5}>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                mt: 1.5,
              }}>
              Đã có tài khoản?{" "}
              <Link
                component="button"
                onClick={() => navigate("/signin")}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                    color: "primary.dark",
                  },
                }}>
                Đăng nhập ngay
              </Link>
            </Typography>
          </Stack>
        </Card>
      </MotionBox>
    </SignUpContainer>
  );
}
