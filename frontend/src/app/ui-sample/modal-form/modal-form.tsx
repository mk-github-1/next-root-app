"use client";

import { JSX } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
  position: "absolute", // 位置を自由に指定できるようにする
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)", // 中央に配置
  width: 400,
  bgcolor: "background.paper", // 背景色（白やグレー）
  borderRadius: 2,
  boxShadow: 24, // 影をつけて浮かせる
  p: 4, // padding
};

// Props
interface IProps {
  open: boolean;
  onClose: () => void;
}

// Organisms
export const ModalForm = (props: IProps): JSX.Element => {
  const { open, onClose }: IProps = props;

  return (
    <>
      {/* Modal */}
      <Modal keepMounted={false} open={open} onClose={onClose}>
        {/* Form */}
        <Box sx={style}>
          {/* Modal header */}
          <Typography variant="h6" component="h2">
            これはモーダル画面です
          </Typography>
          {/* Modal content */}

          {/* Modal footer */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <div style={{ display: "inline-block", marginLeft: "5px" }}>
              <Button size="small" sx={{ ml: 1 }} variant="contained" color="inherit" onClick={onClose}>
                閉じる
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
