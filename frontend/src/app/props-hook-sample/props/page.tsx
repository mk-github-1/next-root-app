"use client";

import { JSX } from "react";

export default function Page(): JSX.Element {
  console.log("レンダリング発生(2回実行)");

  return (
    <>
      <div style={{ border: "1px gray solid", padding: "10px" }}>
        Propsサンプル
        <div style={{ padding: "10px" }}>
          <Children message="mew" />
        </div>
      </div>
    </>
  );
}

// 子コンポーネントは実際は別ファイルに書きますが、説明のため1ファイルに記載します。
// IProps (子コンポーネントで受け取るデータ型)
interface IProps {
  message: string;
}

const Children = function Children(props: IProps): JSX.Element {
  // Propsを受け取る時はオブジェクトの分割代入を利用する
  const { message } = props;

  return (
    <>
      <div style={{ border: "1px gray solid", marginTop: "10px", padding: "10px" }}>
        Childrenコンポーネント
        <div>propsで受け取ったmessage: {message}</div>
      </div>
    </>
  );
};
