"use client";

/**************************************************
 * Setting context
 *
 * useContextのサンプル
 *
 * SettingContextType - ユーザー定義型
 * SettingContext - コンテキスト本体
 * IProps - props
 * SettingProvider - 設定用provider
 * useSetting - 設定用Custom hook
 *
 **************************************************/

import { createContext, ReactNode, useState, useContext } from "react";

// ユーザー定義型
type ThemeType = "default";

interface SettingContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

// コンテキスト本体
const SettingContext = createContext<SettingContextType | undefined>(undefined);

interface IProps {
  children: ReactNode;
  initialTheme: ThemeType;
}

// 設定用provider
export const SettingProvider = (props: IProps) => {
  const { initialTheme } = props;
  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  return <SettingContext.Provider value={{ theme, setTheme }}>{props.children}</SettingContext.Provider>;
};

// 設定用Custom hook
export const useSetting = () => {
  const context = useContext(SettingContext);
  if (!context) throw new Error("useSetting must be used within SettingProvider");

  return context;
};
