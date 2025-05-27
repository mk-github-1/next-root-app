"use client";

import React, { JSX } from "react";
import { Button } from "@mui/material";
// import styles from "./page.module.css";

export default function Page(): JSX.Element {
  // ユーザー定義型
  // eslint-disable-next-line no-restricted-syntax
  interface User {
    account: string;
    age?: number | null;
    isDeleted: boolean;
  }

  /*
   * forEach関数、map関数、filter関数、find関数、reduce関数
   *
   */
  const doSomething: () => void = (): void => {
    // # forEach関数
    // forと同じループ、ループ中のbreak、continueは不可

    // データ
    const users: User[] = [
      { account: "neko1@gmail.com", age: 1, isDeleted: false },
      { account: "neko2@gmail.com", age: 2, isDeleted: false },
    ];

    console.log("forEach関数 ----------");

    users.forEach((element: User /*, index: number */) => {
      console.log(element["account"] + "," + 1 + "," + false);
    });

    // ------------------------------------------------------------

    // # map関数
    // ループして要素数の同じ新しい配列を作成

    // データ
    const users2: User[] = [
      { account: "neko1@gmail.com", age: 1, isDeleted: false },
      { account: "neko2@gmail.com", age: 2, isDeleted: false },
    ];

    console.log("map関数 ----------");

    const newUsers: User[] = users2.map((element: User /*, index: number */) => {
      const user: User = {
        account: element["account"],
        age: 1,
        isDeleted: false,
      };

      return user;
    }, []);

    console.log(newUsers);

    // ------------------------------------------------------------

    // # find 関数
    // 条件に一致した最初の1件を取得

    // データ
    const users3: User[] = [
      { account: "neko1@gmail.com", age: 1, isDeleted: false },
      { account: "neko2@gmail.com", age: 2, isDeleted: false },
    ];

    console.log("find 関数 ----------");

    // 見つかれば最初の1件を取得
    const found: User | undefined = users3.find((element: User) => element["account"] === "neko1@gmail.com");
    console.log(found);

    // 見つからなければundefined
    const found2: User | undefined = users3.find((element: User) => element["account"] === "neko3@gmail.com");
    console.log(found2);

    // ------------------------------------------------------------

    // # filter 関数
    // 条件に一致した配列データを取得

    // データ
    const users4: User[] = [
      { account: "neko1@gmail.com", age: 1, isDeleted: false },
      { account: "neko2@gmail.com", age: 2, isDeleted: false },
      { account: "neko3@gmail.com", age: 2, isDeleted: false },
    ];

    // return trueのアイテムを取得
    console.log("filter 関数 ----------");

    const filtered: User[] = users4.filter((element: User) => {
      return element["age"] === 2;
    });

    console.log(filtered);

    // ------------------------------------------------------------

    // # reduce 関数
    // ループして要素数の異なる新しい配列を作成 (accumulatorにpushしたデータのみを作成)

    // データ
    const users5: User[] = [
      { account: "neko1@gmail.com", age: 1, isDeleted: false },
      { account: "neko2@gmail.com", age: 2, isDeleted: false },
      { account: "neko3@gmail.com", age: 1, isDeleted: false },
    ];

    console.log("reduce 関数 ----------");

    const newUsers2: User[] = users5.reduce((accumulator: User[], element: User /*, index: number */) => {
      if (element["age"] === 1) {
        accumulator.push(element);
      }

      return accumulator;
    }, []);

    console.log(newUsers2);
  };

  return (
    <div>
      <div>プログラムコード5</div>
      <Button variant="contained" onClick={doSomething}>
        ボタン
      </Button>
    </div>
  );
}
