"use client";

// React、MUI
import { JSX, useState, useEffect, useCallback } from "react";
import { Backdrop, CircularProgress, Snackbar, SnackbarContent, Button } from "@mui/material";

// App
import { useApiRequest } from "@/hooks/useApiRequest";
import { User } from "@/types/User";
import { IUserService, createUserService } from "@/services/createUserService";
import { ModalForm } from "./modal-form";

// Template (Layout & stateを持つ場所)
export default function Template(): JSX.Element {
  const PUBLIC_API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
  const API_URL: string = `${PUBLIC_API_URL}/users`;

  // State (loading、error、message、modal)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalKey, setOpenModalKey] = useState<number>(0);

  // State (data)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rowData, setRowData] = useState<User[]>([]);
  const [data, setData] = useState<User | null>(null);

  // Custom hook (API requestの状態の保持、例外処理に利用)
  const { request } = useApiRequest({ setIsLoading, setError });

  // Service (状態を持たない関数)
  const userService: IUserService = createUserService(API_URL);
  /**************************************************
   * データ取得
   *
   **************************************************/
  const fetch = async (): Promise<void> => {
    // useApiRequestのrequestにserviceの関数を渡して実行
    const response: User[] | null = await request(() => userService.get(["xxx"]));
    const users: User[] = Array.isArray(response) ? response : [];

    if (response) {
      setRowData(users);
    } else {
      setRowData([]);
    }
  };

  // 画面表示時にデータ取得し、Tableに表示
  useEffect(() => {
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**************************************************
   * エラーメッセージ表示
   *
   **************************************************/
  useEffect(() => {
    if (error) {
      setSnackbar({ open: true, message: error.message });
    }
  }, [error]);

  /**************************************************
   * ModalFormを開く
   *
   **************************************************/
  const onOpen = (): void => {
    setData(null);
    setOpenModalKey((prev) => prev + 1);
    setOpenModal(true);
  };

  /**************************************************
   * 子コンポーネントに渡す関数
   * 関数名はhandleから始める
   *
   **************************************************/

  // ModalFormを閉じる
  const handleClose = useCallback(() => {
    setData(null);
    setOpenModalKey((prev) => prev + 1);
    setOpenModal(false);
  }, []);

  // ModalFormからの登録
  const handleSubmit = useCallback(async (user: User) => {
    let response: User | null = null;

    // useApiRequestのrequestにserviceの関数を渡して実行
    if (!user?.createdAt) {
      response = await request(() => userService.post(user));
    } else {
      response = await request(() => userService.patch(user));
    }

    if (response) {
      setOpenModal(false);
      fetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = useCallback(async (user: User) => {
    let response: User | null = null;

    // useApiRequestのrequestにserviceの関数を渡して実行
    if (!user?.createdAt) {
      response = await request(() => userService.del(user));
    }

    if (response) {
      setOpenModal(false);
      fetch();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**************************************************
   * return JSX.Element
   *
   **************************************************/

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "5px" }}>
      <div style={{ flex: "0 0 auto" }}>
        <h2>ユーザー一覧</h2>
      </div>

      {/* ModalForm (organisms) */}
      {/* keyは再マウント用、propsで受取不可 */}
      <ModalForm key={openModalKey} open={openModal} data={data} onFormSubmit={handleSubmit} onDelete={handleDelete} onClose={handleClose} />

      <div style={{ flex: "0 0 auto" }}>
        <div style={{ display: "inline-block", marginLeft: "5px" }}>
          <Button size="small" variant="contained" color="primary" onClick={onOpen}>
            新規登録
          </Button>
        </div>
      </div>

      {/* Loading */}
      <Backdrop
        open={isLoading}
        sx={{
          // ← 最前面、背景を透明
          zIndex: (theme) => theme.zIndex.tooltip + 1,
          backgroundColor: "transparent",
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Message */}
      <Snackbar open={snackbar.open} onClose={() => setSnackbar({ ...snackbar, open: false })} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <SnackbarContent
          sx={{
            border: "1px solid #ccc",
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: 3,
            borderRadius: 1,
            px: 2,
            py: 1,
          }}
          message={snackbar.message}
        />
      </Snackbar>
    </div>
  );
}
