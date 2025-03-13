"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { showToast } from "@/app/components/showToast";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false); // Prevents SSR mismatch

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Ensures rendering only on the client

  const onSubmit = async (formData) => {
    const { email, password } = formData;

    try {
      const { data } = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      if (data.token) {
        showToast("Log in Successfully", "success");
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      }
    } catch (err) {
      showToast("Invalid email or password", "error");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90dvh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          gap: "10px",
          backgroundColor: "#ffffff",
          padding: "45px",
          width: "450px",
          borderRadius: "20px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", marginBottom: 1, fontWeight: "bold" }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input Field */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Box>
              <TextField
                fullWidth
                {...register("email", { required: "Email is required" })}
                label="Enter your Email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>
          </Box>

          {/* Password Input Field */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <Box>
              <TextField
                fullWidth
                {...register("password", { required: "Password is required" })}
                label="Enter your Password"
                type="password"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>
          </Box>

          {/* Remember me and Forgot Password */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 2,
            }}
          ></Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#12266a",
              borderRadius: "10px",
              width: "100%",
              height: "50px",
              marginTop: 3,
              "&:hover": {
                backgroundColor: "#12264a",
              },
            }}
          >
            Sign In
          </Button>
        </form>

        <Typography
          sx={{ textAlign: "center", fontSize: "14px", marginTop: 2 }}
        >
          Don't have an account?{" "}
          <span
            onClick={() => router.push("/auth/register")}
            style={{ color: "#2d79f3", cursor: "pointer" }}
          >
            Sign Up
          </span>
        </Typography>
      </Box>
    </Container>
  );
}
