"use client";

import React, { JSX, useState, useEffect } from "react";

export default function Page(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);
  console.log("レンダリング発生(2回実行)");

  // 初期表示
  useEffect(() => {
    console.log("useEffect、初回のみuseStateを更新 ----------", setCount(99));
  }, [count]);

  // 値を変更した時
  useEffect(() => {
    console.log("useEffect2、useStateを更新 ----------", count2);
  }, [count2]);

  const handleClick = (): void => {
    setCount2(count2 + 1);
    console.log("handleClick: ", count2);
  };

  return (
    <>
      <div style={{ border: "1px gray solid", padding: "10px" }}>
        useEffectサンプル
        <div style={{ padding: "10px" }}>
          <div>useEffectのcount: {count}</div>
          <div>画面の初回表示時のみレンダリング</div>
          <div style={{ marginTop: "10px" }}>useEffectのcount2: {count2}</div>
          <div>更新する度に再レンダリングが発生するため画面が更新される。</div>
          <div>
            <button onClick={handleClick}>ボタン</button>
          </div>
        </div>
      </div>
    </>
  );
}
