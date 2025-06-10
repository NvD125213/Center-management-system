import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { RiCustomerService2Fill } from "react-icons/ri";
import { useCreateConsultationMutation } from "../../services/consultantServices";

const Contact = ({ classInfo, onClose }) => {
  const [createConsultation] = useCreateConsultationMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course_id: classInfo?.course?.id || "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const fullName = `Lớp ${classInfo?.name || ""} - Người gửi ${
          formData.name
        }`;
        const res = await createConsultation({
          ...formData,
          name: fullName,
        }).unwrap();

        if (res.success == true) {
          setSnackbar({
            open: true,
            message: res.message,
            severity: "success",
          });
        }

        if (onClose) {
          setTimeout(() => {
            onClose();
            setFormData({
              name: "",
              email: "",
              phone: "",
              course_id: classInfo?.course?.id || "",
            });
          }, 2000);
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message:
            error?.data?.message || "Có lỗi xảy ra, vui lòng thử lại sau.",
          severity: "error",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const customTextFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "all 0.3s ease",
      "&:hover fieldset": {
        borderColor: "#4f46e5",
        boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.1)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4f46e5",
        boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.1)",
      },
    },
  };
  return (
    <Container maxWidth="md" className="relative z-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-12">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 4, md: 5 },
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                }}>
                <Box sx={{ mb: 6, textAlign: "center" }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    <RiCustomerService2Fill
                      className="mx-auto mb-4"
                      style={{
                        fontSize: "3.5rem",
                        color: "#4f46e5",
                        filter: "drop-shadow(0 4px 6px rgba(79, 70, 229, 0.2))",
                      }}
                    />
                  </motion.div>
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      mb: 2,
                      background: "linear-gradient(45deg, #4f46e5, #2563eb)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                    }}>
                    CONTACT US
                  </Typography>
                  {classInfo && (
                    <Typography
                      variant="subtitle1"
                      className="capitalize"
                      sx={{ mb: 2, color: "#4f46e5", fontWeight: "bold" }}>
                      Lớp {classInfo.name} - Khóa Học{" "}
                      {classInfo.course?.menu?.name}
                    </Typography>
                  )}
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}>
                    Gửi cho chúng tôi thông tin của bạn và chúng tôi sẽ sớm liên
                    hệ lại
                  </Typography>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    maxWidth: "600px",
                    mx: "auto",
                  }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <TextField
                      fullWidth
                      label="Tên của bạn"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon sx={{ color: "#4f46e5" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={customTextFieldSx}
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon sx={{ color: "#4f46e5" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={customTextFieldSx}
                    />

                    <TextField
                      fullWidth
                      label="Số điện thoại"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon sx={{ color: "#4f46e5" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={customTextFieldSx}
                    />

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ maxWidth: "400px", margin: "0 auto" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={isSubmitting}
                        endIcon={
                          <SendIcon
                            sx={{
                              animation: isSubmitting
                                ? "spin 1s linear infinite"
                                : "none",
                            }}
                          />
                        }
                        sx={{
                          py: 1.8,
                          mt: 2,
                          borderRadius: 2,
                          textTransform: "none",
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          background:
                            "linear-gradient(45deg, #4f46e5, #2563eb)",
                          boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #4338ca, #1d4ed8)",
                            boxShadow: "0 6px 20px rgba(79, 70, 229, 0.4)",
                          },
                          "&:disabled": {
                            background:
                              "linear-gradient(45deg, #a5b4fc, #93c5fd)",
                          },
                        }}>
                        {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                      </Button>
                    </motion.div>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </motion.div>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

Contact.propTypes = {
  classInfo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    course: PropTypes.shape({
      id: PropTypes.number,
      menu: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    }),
  }),
  onClose: PropTypes.func,
};

Contact.defaultProps = {
  classInfo: null,
  onClose: () => {},
};

export default Contact;
