// app/dashboard/page.jsx
"use client";
import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "@/context/AuthContext";
import { Container, Typography } from "@mui/material";
import axios from "@/lib/axios";
import JobsPage from "../jobs/JobsPage";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { userName } from "@/Redux/Action";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token, "auth");
        if (!token) {
          setUser(null);
          return;
        }
        setUser(null);
        const { data } = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        dispatch(userName(data?.name));
      } catch (error) {
        console.error("Error fetching user:", error.message);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div style={{ height: "90dvh", display: "grid", placeContent: "center" }}>
        <CircularProgress size={60} />
      </div>
    );
  }

  return (
    <Container style={{ paddingTop: "40px" }}>
      <JobsPage />
    </Container>
  );
}
