import { JSONSchemaType } from "ajv";
import { UserDto } from "./UserDto";

// Ajv schema定義
// Dtoの形と同一にする必要がある
export const userSchema: JSONSchemaType<UserDto> = {
  type: "object",
  properties: {
    account: { type: "string", format: "email" },
    username: { type: "string", nullable: true, minLength: 1 },
    password: { type: "string", nullable: true },
    enabled: { type: "boolean", nullable: true },
    accountNonExpired: { type: "boolean", nullable: true },
    accountNonLocked: { type: "boolean", nullable: true },
    credentialsNonExpired: { type: "boolean", nullable: true },
    sortOrder: { type: "integer", nullable: true },
    isDeleted: { type: "boolean", nullable: true },
    createdAt: { type: "string", nullable: true, format: "date-time" },
    updatedAt: { type: "string", nullable: true, format: "date-time" },
  },
  required: ["account"],
  additionalProperties: false,
};
