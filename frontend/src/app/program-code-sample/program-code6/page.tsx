"use client";

import React, { JSX } from "react";
import { Button } from "@mui/material";
// import styles from "./page.module.css";

// ユーザー定義型
interface User {
  account: string;
  age?: number | null;
  isDeleted: boolean;
}

export default function Page(): JSX.Element {
  /*
   * データをJSON文字列に変換 (JSONシリアライズ)、JSON文字列をデータに変換 (JSONデシリアライズ)
   *
   */
  const doSomething: () => void = (): void => {
    // データ
    const users: User[] = [
      { account: "neko1@gmail.com", age: 1, isDeleted: false },
      { account: "neko2@gmail.com", age: 2, isDeleted: false },
    ];

    // データをJSON文字列に変換
    console.log("データをJSON文字列に変換 (JSONシリアライズ) ----------");

    const jsonText: string = JSON.stringify(users);

    console.log(jsonText);

    /* コンソールに表示
    [{"account":"neko1@gmail.com","age":1,"isDeleted":false},
    {"account":"neko2@gmail.com","age":2,"isDeleted":false}]
     */

    // JSON文字列をデータに変換
    console.log("JSON文字列をデータに変換 (JSONデシリアライズ) ----------");

    const users2: User[] = JSON.parse(jsonText);

    console.log(users2);
  };

  return (
    <div>
      <div>プログラムコード6</div>
      <Button variant="contained" onClick={doSomething}>
        ボタン
      </Button>
    </div>
  );
}
