"use client";

/**************************************************
 * Snackbar content container (共通)
 * ※Styleのみ適用
 *
 **************************************************/
import React, { JSX } from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

interface IProps {
  open: boolean;
  onClose: () => void;
  message: string;
  autoHideDuration?: number;
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

export const SnackbarContainer = ({ open, onClose, message, autoHideDuration = 3000, anchorOrigin = { vertical: "top", horizontal: "center" } }: IProps): JSX.Element => {
  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={autoHideDuration} anchorOrigin={anchorOrigin}>
      <SnackbarContent
        sx={{
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "8px 16px"
        }}
        message={message}
      />
    </Snackbar>
  );
};
