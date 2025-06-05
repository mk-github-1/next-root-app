"use client";

import { JSX, useState, useRef } from "react";

export default function Page(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  const count2 = useRef<number>(0);
  console.log("レンダリング発生(2回実行)");

  // useState
  const handleClick = (): void => {
    console.log("handleClick、useStateを更新 ----------");
    setCount(count + 1);
    console.log(count);
  };

  // useRef
  const handleClick2 = (): void => {
    console.log("handleClick2、useRefを更新 ----------");
    count2.current = count2.current + 1;
    console.log(count2.current);
  };

  return (
    <>
      <div style={{ border: "1px gray solid", padding: "10px" }}>
        useRefサンプル
        <div style={{ padding: "10px" }}>
          <div>useStateのcount: {count}</div>
          <div>useStateを更新する度に再レンダリングが発生するため画面が更新される。</div>
          <div>
            <button onClick={handleClick}>useStateのボタン</button>
          </div>
          <div style={{ marginTop: "10px" }}>useRefのcount2: {count2.current}</div>
          <div>内部値の更新のみ、再レンダリングが発生するまで画面は更新されない。</div>
          <div>
            <button onClick={handleClick2}>useRefのボタン</button>
          </div>
        </div>
      </div>
    </>
  );
}
