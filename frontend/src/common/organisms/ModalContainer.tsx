"use client";

/**************************************************
 * Modal container (共通)
 * ※Styleのみ適用
 *
 **************************************************/
import React, { JSX } from "react";
import { Modal, Box } from "@mui/material";

interface IProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}

export const ModalContainer = ({ open, onClose, children, width = 700 }: IProps): JSX.Element => {
  return (
    <Modal open={open} onClose={onClose} keepMounted={false}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          maxHeight: "95vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}>
        {children}
      </Box>
    </Modal>
  );
};
