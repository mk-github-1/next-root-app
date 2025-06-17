"use client";

// React、MUI
import { JSX, useState, useEffect, useCallback } from "react";
import { Box, Backdrop, CircularProgress, Button } from "@mui/material";

// App
import { ModalForm } from "./modal-form";

// Data、Service
import { useApiRequest } from "@/hooks/common/useApiRequest";
import { User } from "@/types/User";
import { createUserService } from "@/services/createUserService";

// Common
import { SnackbarContainer } from "@/common/organisms/SnackbarContainer";
import { sanitize } from "@/common/utilities/sanitize";

// Template (Layout & stateを持つ場所)
export default function Template(): JSX.Element {
  const PUBLIC_API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
  const API_URL: string = `${PUBLIC_API_URL}/users`;

  /**************************************************
   * 状態 (State)、カスタムフック、共通関数
   *
   **************************************************/

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [openModalKey, setOpenModalKey] = useState<number>(0);
  // const [rowData, setRowData] = useState<User[]>([]);
  const [data, setData] = useState<User | null>(null);

  // Custom hook (API requestの状態の保持、例外処理に利用)
  const { request } = useApiRequest({ setIsLoading, setError });

  // Service (状態を持たない関数)
  const userService = createUserService(API_URL);

  /**************************************************
   * 副作用
   *
   **************************************************/

  // エラーメッセージ表示
  useEffect(() => {
    if (error) {
      setSnackbar({ open: true, message: error.message });
    }
  }, [error]);

  /**************************************************
   * 関数・イベント ※Propsで渡す関数名はhandleから始める
   *
   **************************************************/

  // ModalFormを開く
  const onOpen = (): void => {
    setData(null);
    setOpenModalKey((prev) => prev + 1);
    setIsOpenModal(true);
  };

  // ModalFormからの登録
  const handleSubmit = useCallback(async (formData: User) => {
    // Sanitize後に型にセット
    const user = sanitize(formData);

    // useApiRequestのrequestにserviceの関数を渡して実行
    if (!user?.createdAt) {
      const response = await request(() => userService.post(user));

      if (response) {
        setIsOpenModal(false);
        // fetch();
      }
    } else {
      const response = await request(() => userService.patch(user));

      if (response) {
        setIsOpenModal(false);
        // fetch();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ModalFormを閉じる
  const handleClose = useCallback(() => {
    setData(null);
    setOpenModalKey((prev) => prev + 1);
    setIsOpenModal(false);
  }, []);

  /**************************************************
   * return JSX.Element
   *
   **************************************************/
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: "5px" }}>
      <Box sx={{ flex: "0 0 auto" }}>
        <h2>モーダル登録画面</h2>
      </Box>

      {/* ModalForm (organisms) */}
      {/* keyは再マウント用、propsで受取不可 */}
      <ModalForm key={openModalKey} isOpen={isOpenModal} data={data} onFormSubmit={handleSubmit} onClose={handleClose} />

      <Box sx={{ flex: "0 0 auto" }}>
        <Box sx={{ display: "inline-block", marginLeft: "5px" }}>
          <Button size="small" variant="contained" color="primary" onClick={onOpen}>
            新規登録
          </Button>
        </Box>
      </Box>

      {/* Loading */}
      <Backdrop open={isLoading} sx={{ zIndex: (theme) => theme.zIndex.tooltip + 1, backgroundColor: "transparent" }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Message */}
      <SnackbarContainer open={snackbar.open} message={snackbar.message} onClose={() => setSnackbar({ ...snackbar, open: false })} />
    </Box>
  );
}
