"use client";

import React, { JSX } from "react";
import { Button } from "@mui/material";
// import styles from "./page.module.css";

export default function Page(): JSX.Element {
  /*
   * テンプレートリテラル、スプレッド構文、配列の分割代入、オブジェクトの分割代入、オブジェクトの省略記法、オプショナルプロパティ・オプショナルチェインニング
   *
   */
  const doSomething: () => void = (): void => {
    // # テンプレートリテラル
    const message1: string = "mew1";

    console.log("テンプレートリテラル ----------");

    console.log(`${message1}`);

    // ------------------------------------------------------------

    // # スプレッド構文
    // スプレッド構文を使わない配列の追加方法
    const numberLists1: number[] = [1, 2, 3];

    console.log("スプレッド構文を使わない配列の追加 ----------");

    numberLists1.push(4);

    console.log(numberLists1);

    // スプレッド構文で配列を結合
    const numberLists2: number[] = [1, 2, 3];
    const numberLists3: number[] = [4, 5];

    console.log("スプレッド構文 ----------");

    const numberLists4: number[] = [...numberLists2, ...numberLists3];

    console.log(numberLists4);

    // ------------------------------------------------------------

    // # 配列の分割代入
    // データ
    const users: string[] = ["neko1", "neko2", "neko3"];

    // 配列の分割代入 (先頭の2値のみ)
    console.log("配列の分割代入 ----------");

    const [username1, username2]: string[] = users;

    console.log(username1 + "," + username2);

    // ------------------------------------------------------------

    // # オブジェクトの分割代入

    // ユーザー定義型
    // eslint-disable-next-line no-restricted-syntax
    interface User {
      account: string;
      age?: number | null;
      isDeleted: boolean;
    }

    // データ
    const user: User = { account: "neko@gmail.com", age: 1, isDeleted: false };

    // オブジェクトの分割代入
    console.log("オブジェクトの分割代入 ----------");

    const { account: ACCOUNT, age: AGE, isDeleted: IS_DELETED } = user;

    console.log(ACCOUNT + "," + AGE + "," + IS_DELETED);

    // ------------------------------------------------------------

    // # オブジェクトの省略記法

    // データ
    const account: string = "neko@gmail.com";
    const age: number = 1;
    const isDeleted: boolean = false;

    // オブジェクトの省略記法
    console.log("オブジェクトの省略記法 ----------");

    const user2: User = { account, age, isDeleted };

    console.log(user2["account"] + "," + user2["age"] + "," + user2["isDeleted"]);

    // ------------------------------------------------------------

    // # オプショナルプロパティ、オプショナルチェインニング

    // ユーザー定義型
    // eslint-disable-next-line no-restricted-syntax
    interface User2 {
      account: string;

      // オプショナルプロパティ、データ型はnumber または null
      age?: number | null;

      isDeleted: boolean;
    }

    // データ
    const user3: User2 = { account: "neko@gmail.com", isDeleted: false };

    // オプショナルチェインニング
    console.log("オプショナルプロパティ、オプショナルチェインニング ----------");
    console.log(user3.account + "," + user3?.age + "," + user3.isDeleted);
  };

  return (
    <div>
      <div>プログラムコード3</div>
      <Button variant="contained" onClick={doSomething}>
        ボタン
      </Button>
    </div>
  );
}
