import { JSONSchemaType } from "ajv";

export interface UserParams {
  mailAddress: string;
}

export interface UserDto {
  mailAddress: string;
  userName: string;
}

export const userParamsSchema: JSONSchemaType<UserParams> = {
  type: "object",
  properties: {
    mailAddress: { type: "string", format: "email" },
  },
  required: ["mailAddress"],
  additionalProperties: false,
};

export const userSchema: JSONSchemaType<UserDto> = {
  type: "object",
  properties: {
    mailAddress: { type: "string", format: "email" },
    userName: { type: "string", minLength: 1 },
  },
  required: ["mailAddress", "userName"],
  additionalProperties: false,
};
