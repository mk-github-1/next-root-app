"use client";

/**************************************************
 * Modal container (共通)
 * ※Styleのみ適用
 *
 **************************************************/
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxHeight: "95vh",
  overflowY: "auto",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4)
}));
