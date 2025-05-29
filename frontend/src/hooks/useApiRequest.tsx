"use client";

import axios from "axios";
import { ResponseMessages } from "@/constants/ResponseMessages";

interface IProps {
  setIsLoading: (isLoading: boolean) => void;
  setError: (e: Error | null) => void;
}

export const useApiRequest = ({
  setIsLoading,
  setError,
}: IProps): {
  request: <T>(fn: () => Promise<T>) => Promise<T | null>;
} => {
  // 引数 (fn: () => Promise<T>) の、
  // fnの型の "() => Promise<T>"" は、 function(): Promise<T> { } のことであり、
  // createService内で定義したget, post, patch, del関数が使える
  // requestの戻り値は　Promise<T | null> なので、呼び出し元は T (1件または複数件の配列) 、または null を受け取ることができる
  const request = async <T,>(fn: () => Promise<T>): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result: T = await fn();
      return result;
    } catch (error: unknown) {
      const status: number = axios.isAxiosError(error) ? error.response?.status ?? 500 : 500;
      const message = ResponseMessages[status] || ResponseMessages[500];

      setError(new Error(message));
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { request };
};
