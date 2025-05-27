"use client";

import { JSX, useState, useEffect, useCallback } from "react";
import { IUserService, useUserService } from "@/services/useUserService";
import { User } from "@/types/User";
import { Table } from "./table";
import { Button } from "@mui/material";

// Template (Layout & stateを持つ場所)
export default function Template(): JSX.Element {
  const apiUrl: string = process.env.NEXT_PUBLIC_API_URL ?? "";

  // State
  const [rowData, setRowData] = useState<User[]>([]);
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ★これはfetch時の問題
  // エラーフラグが不要の可能性あり？
  const [isError, setIsError] = useState<boolean>(false);
  // メッセージはエラー時に戻り値に含む
  const [messeage, setMesseage] = useState<string>("");

  // Service
  const userService: IUserService = useUserService({ apiUrl, setIsLoading, setIsError });

  /**************************************************
   * データ取得
   *
   **************************************************/
  const fetch = async (): Promise<void> => {
    setIsLoading(true);
    setIsError(false);

    try {
      setIsLoading(true);
      const response: User[] | string = await userService.get(["xxx"]);
      const users: User[] = Array.isArray(response) ? response : [];
      setRowData(users);
    } catch (message: unknown) {
      // ★例外発生時にここが実行されているか？
      if (typeof message === "string") setMesseage(message);

      // ★messageを画面に表示する
    } finally {
      setIsLoading(false);
    }
  };

  // 画面表示時にデータ取得し、Tableに表示
  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 任意のタイミングでデータ取得し、Tableに表示
  const onDataFetch = () => {
    fetch();
  };

  /**************************************************
   * return JSX.Element
   *
   **************************************************/

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: "5px" }}>
      <div style={{ flex: "0 0 auto" }}>
        <h2>ユーザー一覧</h2>
      </div>

      {/* Table (organisms) */}
      <div style={{ flex: "1 1 auto" }}>
        <Table rowData={rowData} isLoading={isLoading} />
      </div>

      <div style={{ flex: "0 0 auto" }}>
        <div style={{ display: "inline-block" }}>
          <Button size="small" variant="contained" color="primary" onClick={() => onDataFetch()}>
            データ再取得
          </Button>
        </div>
      </div>
    </div>
  );
}
