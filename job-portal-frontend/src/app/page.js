"use client";
import { Container, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Container
      style={{ height: "90dvh" }}
      sx={{ textAlign: "center", display: "grid", alignItems: "center" }}
    >
      <Typography component="div">
        <Typography sx={{ pt: 5, textAlign: "center" }} variant="h3">
          Welcome to the Tech Forcing Job Portal
        </Typography>
        <div style={{ padding: "20px" }}>
          <Button
            onClick={() => router.push("/auth/login")}
            variant="contained"
            sx={{
              backgroundColor: "#12266a",
              borderRadius: "10px",
              height: "50px",
              padding: "10px 30px 10px 30px",
              "&:hover": {
                backgroundColor: "#12264a",
              },
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => router.push("/auth/register")}
            variant="contained"
            sx={{
              backgroundColor: "#12266a",
              borderRadius: "10px",

              height: "50px",
              marginLeft: 3,
              "&:hover": {
                backgroundColor: "#12264a",
              },
            }}
          >
            Register
          </Button>
        </div>
      </Typography>
    </Container>
  );
}
