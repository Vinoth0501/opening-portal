"use client";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Popover } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useRouter } from "next/navigation";
import PopoverComponent from "./Popover";
import { userName } from "@/Redux/Action";

const Navbar = () => {
  const [token, setToken] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const user = useSelector((state) => state.nameOfUser);
  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsMounted(true);
    setToken(localStorage.getItem("token"));
  }, []);

  if (!isMounted) return null;
  const handleLogout = () => {
    localStorage.removeItem("token");
    setAnchorEl(null);
    router.push("/");
    dispatch(userName(null));
  };
  return (
    <AppBar position="static" sx={{ backgroundColor: "#12264a", paddingX: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/logo.png"
            alt="TechForing Logo"
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              TechForing
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              Shaping Tomorrows Cybersecurity
            </Typography>
          </Box>
        </Box>

        {user ? (
          <>
            <IconButton
              color="inherit"
              sx={{ fontSize: 40 }}
              onClick={handleClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <PopoverComponent
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              handleClose={handleClose}
            >
              <Typography sx={{ py: 1, pt: 2, px: 3, fontWeight: "semi-bold" }}>
                {user && user}
              </Typography>
              <Typography
                sx={{ pt: 0, pb: 2, px: 3, fontWeight: "semi-bold" }}
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Log Out
              </Typography>
            </PopoverComponent>
          </>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
