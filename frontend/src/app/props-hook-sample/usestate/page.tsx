"use client";

import { JSX, useState } from "react";

export default function Page(): JSX.Element {
  // フックを利用する時は配列の分割代入を利用する
  // count: Stateの変数名
  // setCount: Stateに設定する関数名
  const [count, setCount] = useState<number>(0);
  console.log("レンダリング発生(2回実行)");

  const handleClick = () => {
    console.log("handleClick ----------");
    setCount((count: number) => count + 1);
  };

  return (
    <>
      <div style={{ border: "1px gray solid", padding: "10px" }}>
        useStateサンプル
        <div style={{ padding: "10px" }}>
          <div>useStateのcount: {count}</div>
          <div>useStateを更新する度に再レンダリングが発生するため画面が更新される。</div>
          <div>
            <button onClick={handleClick}>ボタン</button>
          </div>
        </div>
      </div>
    </>
  );
}
