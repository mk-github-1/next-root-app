"use client";

// React、MUI
import { JSX, useState, useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Snackbar,
  SnackbarContent,
} from "@mui/material";

// App
import { useApiRequest } from "@/hooks/common/useApiRequest";
import { User } from "@/types/User";
import { IUserService, createUserService } from "@/services/createUserService";

// Template (Layout & stateを持つ場所)
export default function Template(): JSX.Element {
  const PUBLIC_API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? "";
  const API_URL: string = `${PUBLIC_API_URL}/users`;

  // State (loading、error、message、modal)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  // Custom hook (API requestの状態の保持、例外処理に利用)
  const { request } = useApiRequest({ setIsLoading, setError });

  // Service (状態を持たない関数)
  const userService: IUserService = createUserService(API_URL);

  // 不正なAPI_URL
  const userService2: IUserService = createUserService("test");

  /**************************************************
   * データ取得
   *
   **************************************************/
  const fetch = async (): Promise<void> => {
    // useApiRequestのrequestにserviceの関数を渡して実行
    // 必要があれば、get()の引数にパラメータのオブジェクトを指定します
    const response: User[] | null = await request(() => userService.get());
    const users: User[] = Array.isArray(response) ? response : [];

    if (response) {
      console.log(users);
    } else {
      console.log(null);
    }
  };

  const fetch2 = async (): Promise<void> => {
    // useApiRequestのrequestにserviceの関数を渡して実行
    // 必要があれば、get()の引数にパラメータのオブジェクトを指定します
    const response: User[] | null = await request(() => userService2.get());
    const users: User[] = Array.isArray(response) ? response : [];

    if (response) {
      console.log(users);
    } else {
      console.log(null);
    }
  };

  const handleClick = (): void => {
    fetch();
  };

  const handleClick2 = (): void => {
    fetch2();
  };

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
   * return JSX.Element
   *
   **************************************************/

  return (
    <>
      <div style={{ border: "1px gray solid", padding: "10px" }}>
        カスタムフックサンプル - useApiRequest
        <div style={{ padding: "10px" }}>
          <div>
            <button onClick={handleClick}>HTTPリクエスト</button>
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <div>
            <button onClick={handleClick2}>HTTPリクエスト (エラー)</button>
          </div>
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
      <Snackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
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
    </>
  );
}
