import { JSONSchemaType } from "ajv";

/*
 * User
 * 必須でないプロパティはオプショナル"?"、ユニオン型でnullを許可
 * 登録・更新でデータ型を分ける必要がある
 */

export interface User {
  account: string;
  username: string;
  password?: string | null;
  age?: number | null;
  hobby?: string | null;
  startDate?: string | null;
  isEnabled?: boolean | null;
  remarks?: string | null;
  isDeleted?: boolean | null;
  sortOrder?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
}

// nullの時、nullable: trueにする必要がある
export const userSchema: JSONSchemaType<User> = {
  type: "object",
  properties: {
    account: {
      type: "string",
      minLength: 1, // requiredを通った場合
      maxLength: 256,
      format: "email",
      errorMessage: {
        minLength: "アカウント名は入力が必須です",
        maxLength: "アカウント名は{0}文字以内で入力してください",
        format: "アカウント名は有効なメールアドレスを入力してください",
      },
    },
    username: {
      type: "string",
      minLength: 1, // requiredを通った場合
      maxLength: 256,
      errorMessage: {
        minLength: "ユーザー名は入力が必須です",
        maxLength: "ユーザー名は{0}文字以内で入力してください",
      },
    },
    password: {
      type: "string",
      maxLength: 256,
      errorMessage: {
        maxLength: "パスワードは{0}文字以内で入力してください",
      },
      nullable: true,
    },
    age: { type: "integer", nullable: true },
    hobby: { type: "string", nullable: true },
    startDate: { type: "string", nullable: true },
    isEnabled: {
      type: "boolean",
      errorMessage: {
        type: "有効フラグには true か false を指定してください",
      },
      nullable: true,
    },
    remarks: {
      type: "string",
      nullable: true,
      maxLength: 4000,
      errorMessage: {
        maxLength: "備考は{0}文字以内で入力してください",
      },
    },
    isDeleted: { type: "boolean", nullable: true },
    sortOrder: { type: "integer", nullable: true },
    createdAt: { type: "string", nullable: true },
    updatedAt: { type: "string", nullable: true },
    createdBy: { type: "string", nullable: true },
    updatedBy: { type: "string", nullable: true },
  },
  required: ["account", "username"],
  additionalProperties: false,
  errorMessage: {
    /*
    required: {
      account: "アカウント名は入力が必須です",
      username: "ユーザー名は入力が必須です",
    },
     */
    additionalProperties: "不明なプロパティが含まれています",
  },
};
