"use client";

import React, { JSX } from "react";
import { Button } from "@mui/material";
import { sanitize } from "@/common/utilities/sanitize";
// import styles from "./page.module.css";

export default function Page(): JSX.Element {
  /*
   * サニタイズ関数の実行例
   *
   */
  // ユーザー定義型
  // eslint-disable-next-line no-restricted-syntax
  interface User {
    account: string;
    age?: number | null;
    isDeleted: boolean;
  }

  const doSomething: () => void = (): void => {
    // Sanitizeの実行
    const formData: User = { account: '<script>alert("test")</script>neko@gmail.com', age: 1, isDeleted: false };

    console.log("サニタイズ前 ----------");
    console.log(formData);

    const user: User = sanitize(formData);

    console.log("サニタイズ後 ----------");
    console.log(user);
  };

  return (
    <div>
      <div>Sanitizeの実行</div>
      <Button variant="contained" onClick={doSomething}>
        ボタン
      </Button>
    </div>
  );
}
