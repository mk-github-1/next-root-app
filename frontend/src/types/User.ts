import { JSONSchemaType } from "ajv";

// ユーザー定義型
// 必須でないプロパティはオプショナル"?"、ユニオン型でnullを許可
// 登録・更新等でデータ型が分かれる場合がある
export interface User {
  account: string;
  username: string;
  password?: string | null; // 新規登録時のみ利用
  age?: number | null;
  hobby?: string | null;
  applyDate?: string | null;
  isEnabled?: boolean | null;
  remarks?: string | null;
  isDeleted?: boolean | null;
  sortOrder?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
}

// AJV Validation schema
// nullの時、nullable: trueにする必要がある
export const userSchema: JSONSchemaType<User> = {
  type: "object",
  properties: {
    account: {
      type: "string",
      format: "email",
      maxLength: 256,
      errorMessage: {
        format: "アカウント名は有効なメールアドレスを入力してください", // formatチェックがあるため必須チェックの代わりとなる
        maxLength: "アカウント名は 256 文字以内で入力してください"
      }
    },
    username: {
      type: "string",
      minLength: 1,
      maxLength: 256,
      errorMessage: {
        minLength: "ユーザー名は入力が必須です",
        maxLength: "ユーザー名は 256 文字以内で入力してください"
      }
    },
    password: {
      type: "string",
      maxLength: 256,
      errorMessage: {
        maxLength: "パスワードは 256 文字以内で入力してください"
      },
      nullable: true
    },
    age: { type: "integer", nullable: true },
    hobby: { type: "string", nullable: true },
    applyDate: { type: "string", nullable: true },
    isEnabled: {
      type: "boolean",
      errorMessage: {
        type: "有効フラグには true か false を指定してください"
      },
      nullable: true
    },
    remarks: {
      type: "string",
      nullable: true,
      maxLength: 4000,
      errorMessage: {
        maxLength: "備考は 4000 文字以内で入力してください"
      }
    },
    isDeleted: { type: "boolean", nullable: true },
    sortOrder: { type: "integer", nullable: true },
    createdAt: { type: "string", nullable: true },
    updatedAt: { type: "string", nullable: true },
    createdBy: { type: "string", nullable: true },
    updatedBy: { type: "string", nullable: true }
  },
  // JSONSchemaType<T>を利用しているため、ここにrequiredのプロパティを記載する必要がある
  required: ["account", "username"],
  additionalProperties: false,
  errorMessage: {
    additionalProperties: "不明なプロパティが含まれています"
  }
};
