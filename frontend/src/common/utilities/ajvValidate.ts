/**************************************************
 * AJV validation
 *
 * AJV（Another JSON Schema Validator）を使用して、data を JSON Schemaで検証する
 *
 * ajvValidate: AjvValidationResult<T>
 * @param data - 検証する data
 * @param schema - dataに対応する JSON Schema
 * @returns - Record<string, string>[]
 *  - valid: true の場合はエラーなし []
 *  - valid: false の場合は Record<string, string>[] でフィールドとエラーメッセージを返す
 *
 **************************************************/

import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

export const ajvValidate = <T>(data: T, schema: JSONSchemaType<T>): Record<string, string>[] => {
  // Validation
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  ajvErrors(ajv);

  const validate = ajv.compile(schema);
  const valid = validate(data);

  // valid: true trueは終了
  if (valid) {
    return [];
  }

  // valid: false
  const errors: Record<string, string>[] = [];

  // Get error messages
  for (const error of validate.errors || []) {
    const field: string = error.instancePath.replace(/^\//, "");

    // ルートのschemaはfieldが空、かつ利用無しのためスキップ
    if (!field) continue;

    // エラーメッセージ取得
    const message: string = error.message || "入力エラーがあります";

    // fieldがなければ配列にpush、すでに存在してればそのfieldのメッセージに改行して追加
    const found: Record<string, string> | undefined = errors.find((element: Record<string, string>) => element.field === field);

    if (found === undefined) {
      errors.push({ field, message });
    } else {
      found.message += `\n${message}`;
    }
  }

  return errors;
};
