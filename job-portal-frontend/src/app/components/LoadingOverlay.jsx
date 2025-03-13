import React from "react";
import Box from "@mui/material/Box";

const LoadingOverlay = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 1301,
      }}
    ></Box>
  );
};

export default LoadingOverlay;
