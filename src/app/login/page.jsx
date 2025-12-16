"use client";
import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import API from "@/service/api";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const data = res.data;

      // Save token to cookies
      Cookies.set("token", data.token, { expires: 7 });

      localStorage.setItem("user", JSON.stringify(data.user));
      router.push("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full h-screen bg-white flex items-center justify-center md:justify-end overflow-hidden"
    >
      {/* Animated Circle Section */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden md:flex absolute left-0 top-0 w-[70%] h-full items-center justify-center"
      >
        <div className="relative w-[130%] h-[130%] bg-[#98a1e6] rounded-r-full overflow-hidden left-[-20%]">
          <img
            src="https://plus.unsplash.com/premium_photo-1742395281417-3c49a3d66dd7?q=80&w=1112&auto=format&fit=crop"
            alt="Plant Money"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="ml-[10%] md:mr-[10%] lg:mr-[30%]"
      >
        <Paper
          elevation={6}
          className="p-8 rounded-2xl w-[90%] sm:w-[400px] shadow-xl backdrop-blur-sm"
          sx={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
        >
          <Typography
            variant="h5"
            className="text-center font-bold text-gray-700 text-4x;"
            sx={{
              mb: 6,
              fontSize: 30,
              fontWeight: 600,
              fontFamily: "sans-serif",
            }}
          >
            Admin
          </Typography>

          <Typography className="text-sm text-gray-600 font-medium">
            Email or username
          </Typography>
          <motion.div whileFocus={{ scale: 1.03 }} whileHover={{ scale: 1.01 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              className="mb-5 mt-1 transition-all"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  transition: "0.3s",
                  "& fieldset": {
                    borderColor: "#b4b4b4",
                    transition: "0.3s",
                  },
                  "&:hover fieldset": {
                    borderColor: "#444F87",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#444F87",
                    boxShadow: "0 0 10px rgba(68,79,135,0.4)",
                  },
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>

          <Typography mt={2} className="text-sm text-gray-600 font-medium">
            Password
          </Typography>
          <motion.div whileFocus={{ scale: 1.03 }} whileHover={{ scale: 1.01 }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  transition: "0.3s",
                  "& fieldset": {
                    borderColor: "#b4b4b4",
                  },
                  "&:hover fieldset": {
                    borderColor: "#444F87",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#444F87",
                    boxShadow: "0 0 10px rgba(68,79,135,0.4)",
                  },
                },
              }}
            />
          </motion.div>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#444F87",
              padding: "10px",
              marginTop: "25px",
              fontWeight: "bold",
            }}
            onClick={handleLogin}
            size="small"
          >
            Login
          </Button>

          <Typography
            variant="body2"
            className="text-center text-gray-500"
            sx={{ mt: 6 }}
          >
            © {new Date().getFullYear()} Mutual Fund Panel
          </Typography>
        </Paper>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
