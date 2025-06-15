"use client";

/**************************************************
 * useRenderTimer: 描画時間の計測
 *
 *
 **************************************************/

import { useEffect } from "react";
const STORAGE_KEY = "__RENDER_START__";

// 1. 記録を開始したいコンポーネントに移動するリンクのイベントで、StartTimeをsessionStorageに記録
export const setRenderTimerStart = (): void => {
  sessionStorage.setItem(STORAGE_KEY, performance.now().toString());
};

// 2. マウント完了を確認したいコンポーネント内で呼び出す (Custom Hook)
// 描画時間 = 現在日時 - startTime
export const useRenderTimer = (label?: string): void => {
  useEffect(() => {
    const start = sessionStorage.getItem(STORAGE_KEY);
    if (start) {
      const duration = performance.now() - parseFloat(start);
      console.log(`${label} 描画時間: ${duration.toFixed(2)}ms`);
      sessionStorage.removeItem(STORAGE_KEY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
