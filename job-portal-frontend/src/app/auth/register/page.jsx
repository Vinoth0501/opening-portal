// app/auth/register/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "@/lib/axios";
import { showToast } from "@/app/components/showToast";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/auth/signup", data);
      router.push("/api/auth/login");
      showToast("Data Register Successfully", "success");
    } catch (err) {
      showToast("Registration failed enter valid data", "error");
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
          Register
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Enter your Name"
            margin="normal"
            {...register("name", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Name should contain only letters",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Enter your Email"
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Enter your Password"
            type="password"
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
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
            Register
          </Button>
        </form>
        <Typography
          sx={{ textAlign: "center", fontSize: "14px", marginTop: 2 }}
        >
          Have an Account?{" "}
          <span
            onClick={() => router.push("/auth/login")}
            style={{ color: "#2d79f3", cursor: "pointer" }}
          >
            Sign In
          </span>
        </Typography>
      </Box>
    </Container>
  );
}
