import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Message as MessageIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { RiCustomerService2Fill } from "react-icons/ri";

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

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", formData);
      setSnackbar({
        open: true,
        message: "Message sent successfully! We'll get back to you soon.",
        severity: "success",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
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

  return (
    <section className="min-h-full py-20 relative overflow-hidden bg-[radial-gradient(at_top_left,_green-200,_transparent),_radial-gradient(at_top_right,_green-200,_transparent),_radial-gradient(at_bottom_left,_green-200,_transparent),_radial-gradient(at_bottom_right,_green-200,_transparent)]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

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
                          filter:
                            "drop-shadow(0 4px 6px rgba(79, 70, 229, 0.2))",
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
                      Contract
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}>
                      Gửi cho chúng tôi bất kỳ câu hỏi nào bạn cần được giải đáp
                      và chúng tôi sẽ sớm gửi lại cho bạn
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
                      component="form"
                      onSubmit={handleSubmit}
                      noValidate
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      <TextField
                        fullWidth
                        label="Your Name"
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
                        label="Email Address"
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
                        label="Phone Number"
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

                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MessageIcon sx={{ color: "#4f46e5", mt: 1 }} />
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
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </motion.div>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      <AnimatePresence>
        {snackbar.open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}>
            <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <Alert
                onClose={handleCloseSnackbar}
                severity={snackbar.severity}
                sx={{
                  width: "100%",
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  "& .MuiAlert-icon": {
                    fontSize: "1.5rem",
                  },
                }}>
                {snackbar.message}
              </Alert>
            </Snackbar>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default ContactForm;
