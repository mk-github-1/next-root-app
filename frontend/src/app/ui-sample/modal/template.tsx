"use client";

// React、MUI
import { JSX, useState, useCallback } from "react";
import { Box, Button } from "@mui/material";

// App
import { ModalForm } from "./modal-form";

// Template (Layout & stateを持つ場所)
export default function Template(): JSX.Element {
  /**************************************************
   * 状態 (State)、カスタムフック、共通関数
   *
   **************************************************/

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [openModalKey, setOpenModalKey] = useState<number>(0);

  /**************************************************
   * 関数・イベント ※Propsで渡す関数名はhandleから始める
   *
   **************************************************/

  // ModalFormの開閉
  const onOpen = (): void => {
    setOpenModalKey((prev: number) => prev + 1);
    setIsOpenModal(true);
  };

  // ModalFormを閉じる
  const handleClose = useCallback(() => {
    setOpenModalKey((prev: number) => prev + 1);
    setIsOpenModal(false);
  }, []);

  /**************************************************
   * return JSX.Element
   *
   **************************************************/

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: "5px" }}>
      <Box sx={{ flex: "0 0 auto" }}>
        <h2>モーダル画面の開閉</h2>
      </Box>

      {/* ModalForm (organisms) */}
      {/* keyは再マウント用、propsで受取不可 */}
      <ModalForm key={openModalKey} isOpen={isOpenModal} onClose={handleClose} />

      <Box sx={{ flex: "0 0 auto" }}>
        <Box sx={{ display: "inline-block", marginLeft: "5px" }}>
          <Button size="small" variant="contained" color="primary" onClick={onOpen}>
            モーダル画面を開く
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
