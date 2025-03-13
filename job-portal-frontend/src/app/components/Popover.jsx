"use client";
import React from "react";
import { Popover as MUIPopover } from "@mui/material";

const PopoverComponent = ({ anchorEl, handleClose, open, children }) => {
  return (
    <MUIPopover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      {children}
    </MUIPopover>
  );
};

export default PopoverComponent;
