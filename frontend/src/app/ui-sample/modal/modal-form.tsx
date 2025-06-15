"use client";

// React、MUI
import { JSX } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

// Common
import { ModalContainer } from "@/common/organisms/ModalContainer";

// MUI modal box style
/*
const modalBoxStyle = {
  position: "absolute", // 位置を自由に指定できるようにする
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)", // 中央に配置
  width: 400,
  bgcolor: "background.paper", // 背景色（白やグレー）
  borderRadius: 2,
  boxShadow: 24, // 影をつけて浮かせる
  p: 4 // padding
};
 */

// Props
interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

// Organisms
export const ModalForm = (props: IProps): JSX.Element => {
  /**************************************************
   * Props
   *
   **************************************************/

  const { isOpen, onClose } = props;

  /**************************************************
   * return JSX.Element
   *
   **************************************************/
  return (
    <>
      {/* Modal */}
      <Modal keepMounted={false} open={isOpen} onClose={onClose}>
        {/* Form */}
        {/* <Box sx={modalBoxStyle}> は ModalContainer でスタイルのみ作成 */}
        <ModalContainer>
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
        </ModalContainer>
      </Modal>
    </>
  );
};
