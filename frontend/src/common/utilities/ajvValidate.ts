/**************************************************
 * AJV validation
 *
 * AJV（Another JSON Schema Validator）を使用して、data を JSON Schemaで検証する
 *
 * @param data - 検証する data
 * @param schema - dataに対応する JSON Schema
 * @returns - validation result
 *  - valid: true の場合はエラーなし（errors: null）
 *  - valid: false の場合は、フィールドごとのエラーメッセージを含む errors を返す
 *
 **************************************************/

import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

interface AjvValidationResult<T> {
  valid: boolean;
  errors: Record<keyof T, string> | null;
}

export const ajvValidate = <T>(data: T, schema: object): AjvValidationResult<T> => {
  // Validation
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  ajvErrors(ajv);

  const validate = ajv.compile(schema);
  const valid = validate(data);

  // valid: true
  if (valid) {
    return { valid: true, errors: null };
  }

  // valid: false
  const errors: Record<string, string> = {};

  // Get error messages
  for (const error of validate.errors || []) {
    // required時
    if (error.keyword === "errorMessage" && Array.isArray(error.params?.errors)) {
      const inner = error.params.errors[0];
      const field = inner.params?.missingProperty || inner.instancePath.replace(/^\//, "");

      if (field) {
        errors[field] = error.message || "入力エラーがあります";
      }

      // required以外
    } else {
      const field = error.instancePath.replace(/^\//, "");

      if (field) {
        errors[field] = error.message || "入力エラーがあります";
      }
    }
  }

  return {
    valid: false,
    errors: errors as Record<keyof T, string>,
  };
};
