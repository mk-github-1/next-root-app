"use client";

import React, { JSX, memo, useState, useCallback, ChangeEvent } from "react";

interface Test {
  account: string;
  age: number;
}

export default function Page(): JSX.Element {
  const [data, setData] = useState<Test>({ account: "test", age: 0 });
  const [data2, setData2] = useState<Test>({ account: "test", age: 0 });
  console.log("レンダリング発生(2回実行)");

  // useCallback無しの関数
  const handleSubmit = (form: Test) => {
    console.log("handleSubmit ----------");
    setData(form);
  };

  // useCallback有りの関数
  const handleSubmit2 = useCallback((form: Test) => {
    console.log("handleSubmit2 ----------");
    setData2(form);
  }, []);

  return (
    <>
      <div style={{ border: "1px gray solid", padding: "10px" }}>
        UseCallbackサンプル
        <div style={{ marginTop: "10px", padding: "10px" }}>
          <div>name: {data.account ?? ""}</div>
          <div>age: {data.age ?? ""} </div>
          <Children1 data={data} onSubmit={handleSubmit} />
          <Children2 data2={data2} onSubmit2={handleSubmit2} />
        </div>
      </div>
    </>
  );
}

// IProps (子コンポーネントで受け取るデータ型)
interface IProps {
  data: Test;
  onSubmit: (form: Test) => void;
}

const Children1 = memo(function Children(props: IProps): JSX.Element {
  const { data, onSubmit } = props;
  const [form, setForm] = useState<Test>(data);
  console.log("Children1のレンダリング発生(2回実行)");

  // 検証用のダミー
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    // setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ボタンイベント
  // onSubmitで親へ渡す
  const handleClick = () => {
    console.log("handleClick ----------");
    setForm({ account: form.account, age: form.age + 1 });
    onSubmit(form);
  };

  return (
    <>
      <div style={{ border: "1px gray solid", marginTop: "10px", padding: "10px" }}>
        Children1コンポーネント
        <div style={{ padding: "10px" }}>
          <div>
            name: <input type="text" name="account" value={form["account"]} onChange={handleChange} />
          </div>
          <div>
            age: <input type="number" name="age" value={form["age"]} onChange={handleChange} />
          </div>
          <div>useCallback無し：値を更新すると、親・Children1の再レンダリングが発生する。</div>
          <div>
            <button onClick={handleClick}>ボタン</button>
          </div>
        </div>
      </div>
    </>
  );
});

// IProps (子コンポーネントで受け取るデータ型)
interface IProps2 {
  data2: Test;
  onSubmit2: (form: Test) => void;
}

const Children2 = memo(function Children(props: IProps2): JSX.Element {
  const { data2, onSubmit2 } = props;
  const [form, setForm] = useState<Test>(data2);
  console.log("Children2のレンダリング発生(2回実行)");

  // 検証用のダミー
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // const { name, value } = e.target;
    // setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ボタンイベント
  // onSubmitで親へ渡す
  const handleClick2 = () => {
    console.log("handleClick2 ----------");
    setForm({ account: form.account, age: form.age + 1 });
    onSubmit2(form);
  };

  return (
    <>
      <div style={{ border: "1px gray solid", marginTop: "10px", padding: "10px" }}>
        Children2コンポーネント
        <div style={{ padding: "10px" }}>
          <div>
            name: <input type="text" name="account" value={form["account"]} onChange={handleChange} />
          </div>
          <div>
            age: <input type="number" name="age" value={form["age"]} onChange={handleChange} />
          </div>
          <div>useCallback有り：値を更新すると、親・Children1・2の再レンダリングが発生する。Children1は値を更新していないのに不要な再レンダリングが発生している。</div>
          <div>
            <button onClick={handleClick2}>ボタン</button>
          </div>
        </div>
      </div>
    </>
  );
});
