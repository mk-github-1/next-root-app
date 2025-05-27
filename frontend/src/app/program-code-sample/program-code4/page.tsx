"use client";

import React, { JSX } from "react";
import { Button } from "@mui/material";
// import styles from "./page.module.css";

export default function Page(): JSX.Element {
  /*
   * 条件分岐、等価・不等価演算子、三項演算子、ループ(for文)
   *
   */
  const doSomething: () => void = (): void => {
    // # 条件分岐 (if ～ else文)
    const message1: string = "mew1";

    console.log("条件分岐 (if ～ else文) ----------");

    if (message1 === "mew1" || message1 === "mew2") {
      console.log("something-1-1");
    } else if (true) {
      // something
    } else {
      //something
    }

    // ------------------------------------------------------------

    // # 等価・不等価演算子
    const message2: string = "mew1";

    console.log("等価・不等価演算子 ----------");

    if (message2 === "mew1") {
      console.log("something-2-1");
    }

    if (message2 !== "mew2") {
      console.log("something-2-2");
    }

    // ==、!= も動くが緩い比較になる(非推奨)
    /*
    const age = 1
    if (age === "1") {
      console.log("something-2-3");
    }
     */

    // ------------------------------------------------------------

    // # 三項演算子
    const isChecked: boolean = true;

    console.log("三項演算子 ----------");

    const message3: string = isChecked ? "mew3" : "mew4";

    console.log(message3);

    // ------------------------------------------------------------

    // # ループ (for文)
    console.log("ループ (for文) ----------");

    for (let j: number = 0; j < 5; j++) {
      console.log(j);
    }

    // # for + break
    console.log("for + break ----------");

    for (let j: number = 0; j < 5; j++) {
      if (j > 3) {
        break;
      }

      console.log(j);
    }

    // # for + continue
    console.log("for + continue ----------");

    for (let j: number = 0; j < 5; j++) {
      if (j === 1) {
        continue;
      }

      console.log(j);
    }
  };

  return (
    <div>
      <div>プログラムコード4</div>
      <Button variant="contained" onClick={doSomething}>
        ボタン
      </Button>
    </div>
  );
}
