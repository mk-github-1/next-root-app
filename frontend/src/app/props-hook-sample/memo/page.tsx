"use client";

import { JSX, memo, useState } from "react";

export default function Page(): JSX.Element {
  const [count, setCount] = useState<number>(0);
  console.log("レンダリング発生(2回実行)");

  return (
    <>
      <div style={{ border: "1px gray solid", padding: "10px" }}>
        memoサンプル
        <div style={{ marginTop: "10px", padding: "10px" }}>
          <div>count: {count}</div>
          <div>memo無しChildren1コンポーネント：親の再レンダリングが発生すると、子の再レンダリングも発生する。</div>
          <div>memo有りChildren2コンポーネント：親の再レンダリングが発生しても、子の再レンダリングは発生しない。</div>
          <div>
            <button onClick={() => setCount(count + 1)}>ボタン</button>
          </div>
          <Children1 message="mew" />
          <Children2 message="mew2" />
        </div>
      </div>
    </>
  );
}

interface IProps {
  message: string;
}

// memo無し
const Children1 = function Children(props: IProps): JSX.Element {
  const { message } = props;
  console.log("Children1のレンダリング発生(2回実行)");

  return (
    <>
      <div style={{ border: "1px gray solid", marginTop: "10px", padding: "10px" }}>
        memo無しChildren1コンポーネント
        <div>propsで受け取ったmessage: {message}</div>
      </div>
    </>
  );
};

// memo有り
const Children2 = memo(function Children2(props: IProps): JSX.Element {
  const { message } = props;
  console.log("Children2のレンダリング発生(2回実行)");

  return (
    <>
      <div style={{ border: "1px gray solid", marginTop: "10px", padding: "10px" }}>
        memo有りChildren2コンポーネント
        <div>propsで受け取ったmessage: {message}</div>
      </div>
    </>
  );
});
