"use client";

import axios from "axios";
import { ResponseMessages } from "@/constants/ResponseMessages";

interface IProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (e: Error | null) => void;
}

interface IUseApiRequest {
  request: <T>(fn: () => Promise<T>) => Promise<T | null>;
}

export const useApiRequest = (props: IProps): IUseApiRequest => {
  /**************************************************
   * Props
   *
   **************************************************/

  const { setIsLoading, setError } = props;

  /**************************************************
   * 関数
   *
   **************************************************/

  // request関数の
  // 引数 (fn: () => Promise<T>) の、
  // fnの型の "() => Promise<T>"" は、 function(): Promise<T> { } のことであり、
  // createService内で定義したget, post, patch, del関数が使える
  // requestの戻り値は　Promise<T | null> なので、呼び出し元は T (1件または複数件の配列) 、または null を受け取ることができる

  // stackblitz用のprettier除外設定
  // prettier-ignore
  const request = async <T,>(fn: () => Promise<T>): Promise<T | null> => {
    // loading開始、エラーリセット
    setIsLoading(true);
    setError(null);

    // HTTP リクエストの例外処理
    try {
      // 純粋な関数を実行
      const result: T = await fn();
      return result;
    } catch (error: unknown) {
      // 例外時、HTTP レスポンスのステータスコードから、ResponseMessagesのエラーメッセージ取得
      // 基本のステータスコードがResponseMessagesになければ一律500エラー
      const status: number = axios.isAxiosError(error)
        ? error.response?.status ?? 500
        : 500;
      const message = ResponseMessages[status] || ResponseMessages[500];

      // setErrorに追加
      setError(new Error(message));
      return null;
    } finally {
      // loading終了
      setIsLoading(false);
    }
  };

  /**************************************************
   * return
   *
   **************************************************/

  return { request };
};
