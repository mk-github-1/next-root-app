"use client";

import React, { JSX } from "react";

export default function Page(): JSX.Element {
  return (
    <div style={{ border: "1px gray solid", padding: "10px" }}>
      カスタムフックサンプル
      <div style={{ padding: "10px" }}>User pageで確認</div>
    </div>
  );
}
