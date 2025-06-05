import { JSONSchemaType } from "ajv";

/*
 * UserDTO
 * 必須でないプロパティはオプショナル"?"、ユニオン型でnullを許可
 */
export class UserDto {
  account: string = "";
  username?: string | null;
  password?: string | null;
  age?: number | null;
  hobby?: string | null;
  applyDate?: string | null;
  isEnabled?: boolean | null;
  remarks?: string | null;
  sortOrder?: number | null;
  isDeleted?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
}

// 用途によってSchemaを分ける必要がある
// nullの時、nullable: trueにする必要がある、警告はでない
export const userSchema: JSONSchemaType<UserDto> = {
  type: "object",
  properties: {
    account: {
      type: "string",
      format: "email",
      maxLength: 256,
      errorMessage: {
        format: "アカウント名は有効なメールアドレスを入力してください",
        maxLength: "アカウント名は{0}文字以内で入力してください",
      },
    },
    username: {
      type: "string",
      minLength: 1, // ← これが空文字を防ぐ
      maxLength: 256,
      errorMessage: {
        minLength: "ユーザー名は入力が必須です",
        maxLength: "ユーザー名は{0}文字以内で入力してください",
      },
      nullable: true,
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
    applyDate: { type: "string", nullable: true },
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
    createdAt: { type: "string", nullable: true, format: "date-time" },
    updatedAt: { type: "string", nullable: true, format: "date-time" },
    createdBy: { type: "string", nullable: true },
    updatedBy: { type: "string", nullable: true },
  },
  required: ["account"],
  additionalProperties: false,
  errorMessage: {
    required: {
      account: "アカウント名は必須です",
    },
    additionalProperties: "不明なプロパティが含まれています",
  },
};
