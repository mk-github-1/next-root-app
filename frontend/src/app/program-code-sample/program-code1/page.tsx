"use client";

import React, { JSX } from "react";
import { Button } from "@mui/material";
// import styles from "./page.module.css";

export default function Page(): JSX.Element {
  /*
   * 基本のデータ型、関数、配列、オブジェクト型、Record 型の利用方法ついて
   *
   */
  const doSomething: () => void = (): void => {
    // # constで変数宣言(値の再代入不可)
    console.log("constで変数宣言 ----------");

    const message1: string = "mew1";
    console.log(message1 + "\n");

    // ------------------------------------------------------------

    // # letで変数宣言(値の再代入可)
    console.log("letで変数宣言 ----------");

    let message2: string = "mew2";
    message2 = "mew2";
    console.log(message2 + "\n");

    // ------------------------------------------------------------

    // # varで変数宣言(非推奨、再宣が可、関数スコープのため利用禁止)
    // var message3: string = 'mew3'
    // var message3: string = 'mew4' ※やばい

    // ------------------------------------------------------------

    // # 基本のデータ型
    console.log("基本のデータ型 ----------");

    const account: string = "neko";
    const age: number = 5;
    const isDeleted: boolean = true;
    console.log(account + "\n" + age + "\n" + isDeleted + "\n");

    // ------------------------------------------------------------

    // # 配列
    console.log("配列 ----------");

    const numberLists: number[] = [1, 2, 3];

    console.log(numberLists + "\n");

    // ------------------------------------------------------------

    // # 関数 (function利用)
    console.log("関数 (function利用) ----------");

    const doSomething1: (element: string) => void = function doSomething1(element: string): void {
      console.log(element);
    };
    doSomething1("mew5" + "\n");

    // # 関数 (function利用、無名関数)
    console.log("関数 (function利用、無名関数) ----------");

    const doSomething2: (element: string) => void = function (element: string): void {
      console.log(element);
    };
    doSomething2("mew6" + "\n");

    // # 関数 (ES6以降のアロー演算子を利用)
    console.log("関数 (ES6以降のアロー演算子を利用)) ----------");

    const doSomething3: (element: string) => void = (element: string): void => {
      console.log(element);
    };
    doSomething3("mew7" + "\n");

    // # 関数 (ES6以降のアロー演算子を利用、戻り値あり)
    console.log("関数 (ES6以降のアロー演算子を利用、戻り値あり) ----------");

    const doSomething4: (element: string) => string = (element: string): string => {
      element = "mew8";
      return element;
    };
    const message4: string = doSomething4("mew9" + "\n");
    console.log(message4);

    // ------------------------------------------------------------

    // # ユーザー定義型とデータ、その配列
    // eslint-disable-next-line no-restricted-syntax
    interface User {
      account: string;
      age?: number | null;
      isDeleted: boolean;
    }

    console.log("ユーザー定義型 ----------");

    const user: User = { account: "neko@gmail.com", age: 1, isDeleted: false };

    console.log(user["account"] + "," + user["age"] + "," + user["isDeleted"] + "\n");

    console.log("ユーザー定義型の配列 ----------");

    const users: User[] = [
      { account: "neko1@gmail.com", age: 1, isDeleted: false },
      { account: "neko2@gmail.com", age: 1, isDeleted: false },
    ];
    console.log(users);

    // ------------------------------------------------------------

    // # Record型 (ユーザー定義型を用意するまでもない時)
    console.log("Record型 ----------");

    const user2: Record<string, string> = { account: "neko@gmail.com", age: "1", isDeleted: "false" };

    console.log(user2["account"] + "," + user2["age"] + "," + user2["isDeleted"] + "\n");
  };

  return (
    <div>
      <div>プログラムコード1</div>
      <Button variant="contained" onClick={doSomething}>
        ボタン
      </Button>
    </div>
  );
}
