"use client";

import React, { JSX } from "react";

export default function Page(): JSX.Element {
  return (
    <div style={{ border: "1px gray solid", padding: "10px" }}>
      useContext サンプル
      <div style={{ padding: "10px" }}>Header部で確認</div>
    </div>
  );
}
