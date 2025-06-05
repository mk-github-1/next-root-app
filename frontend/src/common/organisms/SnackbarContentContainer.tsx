"use client";

/**************************************************
 * Snackbar content container (共通)
 * ※Styleのみ適用
 *
 **************************************************/
import { SnackbarContent } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SnackbarContentContainer = styled(SnackbarContent)(({ theme }) => ({
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  color: "#000",
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2)
}));
