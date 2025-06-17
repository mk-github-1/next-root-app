"use client";

// React、MUI
import { JSX, useState, useEffect, useCallback } from "react";
import { Box, Backdrop, CircularProgress, Button } from "@mui/material";

// AG Grid
import type { RowDoubleClickedEvent } from "ag-grid-community";

// App
import { Table } from "./table";

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
  const [rowData, setRowData] = useState<User[]>([]);

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

  // データ取得
  const fetch = async (): Promise<void> => {
    // useApiRequestのrequestにserviceの関数を渡して実行
    // 必要があれば、get()の引数にパラメータのオブジェクトを指定します
    const response = await request(() => userService.get());

    const users = Array.isArray(response)
      ? response.map((element) => {
          // Sanitize後に型にセット
          return sanitize(element);
        }, [])
      : [];

    if (response) {
      setRowData(users);
    } else {
      setRowData([]);
    }
  };

  // 任意のタイミングでデータ取得し、Tableに表示
  const onDataFetch = async (): Promise<void> => {
    await fetch();
  };

  // TableのRowDoubleClick
  const handleRowDoubleClick = useCallback((event: RowDoubleClickedEvent<User>) => {
    // Sanitize後に型にセット
    const user = sanitize(event.data) ?? null;

    // 実際はデータを渡してモーダルを開く
    if (user) {
      /*
      setData(user);
      setOpenModal(true);
       */
    }

    alert("テーブルの行をダブルクリックしました。");
  }, []);

  /**************************************************
   * return JSX.Element
   *
   **************************************************/
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", gap: "5px" }}>
      <Box sx={{ flex: "0 0 auto" }}>
        <h2>ユーザー一覧</h2>
      </Box>

      {/* Table (organisms) */}
      <Box sx={{ flex: "1 1 auto" }}>
        <Table rowData={rowData} onRowDoubleClick={handleRowDoubleClick} />
      </Box>

      <Box sx={{ flex: "0 0 auto" }}>
        <Box sx={{ display: "inline-block" }}>
          <Button size="small" variant="contained" color="primary" onClick={() => onDataFetch()}>
            データ再取得
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
