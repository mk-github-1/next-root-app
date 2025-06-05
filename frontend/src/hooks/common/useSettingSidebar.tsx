"use client";

import { useState, useEffect, useRef } from "react";
import localforage from "localforage";

interface IUseSidebar {
  isOpen: boolean;
  handleToggleOpen: () => void;
}

export const useSettingSidebar = (): IUseSidebar => {
  /**************************************************
   * 状態 (State)、Ref
   *
   **************************************************/

  // 開閉状態
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // mount状態
  const [isMounted, setIsMounted] = useState(false);

  // localstrage key
  const localStorageKey = useRef<string>("sidebar-state");

  /**************************************************
   * 副作用
   *
   **************************************************/

  // 初回のみ実行、localforage でlocalstrage(ブラウザのIndexed DB)の、キーの値を読み込む
  useEffect(() => {
    localforage.getItem<boolean>(localStorageKey.current).then((value) => {
      if (typeof value === "boolean") {
        setIsOpen(value);
      } else {
        // 値がなかったときは true
        setIsOpen(true);
      }

      setIsMounted(true);
    });
  }, []);

  // 開閉の度に実行
  useEffect(() => {
    // mounted以降
    if (isMounted) {
      // localforage でlocalstrage(ブラウザのIndexed DB)のキーに値をセット
      localforage.setItem(localStorageKey.current, isOpen);
    }
  }, [isMounted, isOpen]);

  /**************************************************
   * 関数・イベント
   *
   **************************************************/

  const handleToggleOpen = (): void => setIsOpen((prev) => !prev);

  /**************************************************
   * return
   *
   **************************************************/

  return { isOpen, handleToggleOpen };
};
