import axios, { AxiosResponse } from "axios";
import { User } from "@/types/User";

// Interface
export interface IUserService {
  get: (params?: string[]) => Promise<User[] | null>;
  post: (user: User) => Promise<User | null>;
  patch: (user: User) => Promise<User | null>;
  del: (user: User) => Promise<User | null>;
}

export const createUserService = (apiUrl: string): IUserService => {
  const get = async (params?: string[]): Promise<User[] | null> => {
    const response: AxiosResponse<User[]> = await axios.get(apiUrl, {
      params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  };

  const post = async (user: User): Promise<User | null> => {
    const response: AxiosResponse<User> = await axios.post(apiUrl, JSON.stringify(user), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  };

  const patch = async (user: User): Promise<User | null> => {
    const response: AxiosResponse<User> = await axios.patch(apiUrl, JSON.stringify(user), {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  };

  const del = async (user: User): Promise<User | null> => {
    const response: AxiosResponse<User> = await axios.delete(apiUrl, {
      data: JSON.stringify(user),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  };

  return { get, post, patch, del };
};
