"use client";

import React, { JSX } from "react";
import { Button } from "@mui/material";
// import styles from "./page.module.css";

export default function Page(): JSX.Element {
  /*
   * オブジェクトの参照コピーと値コピーについて
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
    // 参照コピーの例、ageが2に更新されている
    console.log("参照コピー ----------");
    const user: User = { account: "neko@gmail.com", age: 1, isDeleted: false };
    const copyUser: User = user;
    user["age"] = 2;
    console.log(copyUser["age"]);

    // 値コピーの例、ageは1のまま変更なし
    console.log("値コピー ----------");
    const user2: User = { account: "neko@gmail.com", age: 1, isDeleted: false };
    const copyUser2: Record<string, string> = JSON.parse(JSON.stringify(user2));
    user2["age"] = 3;
    console.log(copyUser2["age"]);
  };

  return (
    <div>
      <div>プログラムコード2</div>
      <Button variant="contained" onClick={doSomething}>
        ボタン
      </Button>
    </div>
  );
}
