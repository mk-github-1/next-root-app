import axios, { AxiosResponse } from "axios";
import { User } from "@/types/User";

// Interface
// 実際は画面で扱うデータ型とHTTPリクエストで扱うデータ型は異なる場合があります
interface IUserService {
  get: (params?: string[]) => Promise<User[] | null>;
  post: (user: User) => Promise<User | null>;
  patch: (user: User) => Promise<User | null>;
  del: (user: User) => Promise<User | null>;
}

export const createUserService = (apiUrl: string): IUserService => {
  // データ取得 (1件の配列 or 複数件の配列)
  const get = async (params?: string[]): Promise<User[] | null> => {
    const response: AxiosResponse<User[]> = await axios.get(apiUrl, {
      params,
      headers: {
        Accept: "application/json",
        // Authorization: "Bearer ...", // 認証でjsonwebtokenを利用する時など、実際はAuthorizationが必須になります
        "Content-Type": "application/json"
      }
    });

    return response.data;
  };

  // 新規登録 (1件) ※画面によっては複数件の処理に変更が必要
  const post = async (user: User): Promise<User | null> => {
    const response: AxiosResponse<User> = await axios.post(apiUrl, JSON.stringify(user), {
      headers: {
        Accept: "application/json",
        // Authorization: "Bearer ...",
        "Content-Type": "application/json" // 画像などのバイナリデータを扱いたい時は調整が必要
      }
    });

    return response.data;
  };

  // 更新 (1件) ※画面によっては複数件の処理に変更が必要
  const patch = async (user: User): Promise<User | null> => {
    const response: AxiosResponse<User> = await axios.patch(apiUrl, JSON.stringify(user), {
      headers: {
        Accept: "application/json",
        // Authorization: "Bearer ...",
        "Content-Type": "application/json"
      }
    });

    return response.data;
  };

  // deleteが予約語のためdelにしています
  // 削除 (1件) ※backendでは論理削除の場合が多い、画面によっては複数件の処理に変更が必要
  const del = async (user: User): Promise<User | null> => {
    const response: AxiosResponse<User> = await axios.delete(apiUrl, {
      data: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        // Authorization: "Bearer ...",
        "Content-Type": "application/json"
      }
    });

    return response.data;
  };

  return { get, post, patch, del };
};
