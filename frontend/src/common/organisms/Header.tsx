"use client";

import { JSX } from "react";
import { SettingProvider, useSetting } from "@/context/SettingContext";

interface IProps {
  initialTheme: "default";
}

export default function Header(props: IProps): JSX.Element {
  // const { theme } = useSetting();

  // providerに値を設定してから
  // HeaderContent内でカスタムフックのuseSettingを実行
  // useSettingでuseContextにセット
  return (
    <SettingProvider {...props}>
      <HeaderContent />
    </SettingProvider>
  );
}

function HeaderContent(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { theme } = useSetting();

  return <>Next.js サンプルアプリ</>;
}
