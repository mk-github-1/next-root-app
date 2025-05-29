"use client";

import { JSX, useState, useCallback } from "react";
import { ModalForm } from "./modal-form";
import { Button } from "@mui/material";

// Template (Layout & stateを持つ場所)
export default function Template(): JSX.Element {
  // State
  const [open, setOpen] = useState(false);
  const [openKey, setOpenKey] = useState(0);

  /**************************************************
   * ModalFormの開閉
   *
   **************************************************/
  const onOpen = (): void => {
    setOpenKey((prev) => prev + 1);
    setOpen(true);
  };

  /**************************************************
   * 子コンポーネントに渡す関数
   * 関数名はhandleから始める
   *
   **************************************************/

  // ModalFormを閉じる
  const handleClose = useCallback(() => {
    setOpenKey((prev) => prev + 1);
    setOpen(false);
  }, []);

  /**************************************************
   * return JSX.Element
   *
   **************************************************/
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "5px" }}>
      <div style={{ flex: "0 0 auto" }}>
        <h2>User Page</h2>
      </div>

      {/* ModalForm (organisms) */}
      {/* keyは再マウント用、propsで受取不可 */}
      <ModalForm key={openKey} open={open} onClose={handleClose} />

      <div style={{ flex: "0 0 auto" }}>
        <div style={{ display: "inline-block", marginLeft: "5px" }}>
          <Button size="small" variant="contained" color="primary" onClick={onOpen}>
            モーダル画面を開く
          </Button>
        </div>
      </div>
    </div>
  );
}
