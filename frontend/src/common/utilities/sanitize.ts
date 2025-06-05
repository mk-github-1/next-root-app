/**************************************************
 * DompurifyでSanitize
 *
 * Dompurifyを利用して text または オブジェクト のサニタイズを行う
 *
 * sanitizeObject: T
 * @param input - 処理するオブジェクト、配列、オブジェクトのネスト対応
 * @return cleanObject
 *
 **************************************************/
import DOMPurify from "dompurify";

export const sanitize = <T>(input: T): T => {
  // 戻り値がTのため "as T" を利用する必要がある

  // stringであればサニタイズ、number, boolean, null, undefined などはそのまま
  if (typeof input === "string") {
    return DOMPurify.sanitize(input) as T;
  }

  // 配列であれば再帰処理
  if (Array.isArray(input)) {
    return input.map((element) => sanitize(element)) as T;
  }

  // オブジェクトであればプロパティごとに再帰処理
  if (input !== null && typeof input === "object") {
    // 入力がオブジェクトの場合、各プロパティを再帰的にサニタイズ
    const sanitizedObj = {} as { [K in keyof T]: T[K] };

    for (const key in input) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitizedObj[key] = sanitize(input[key]);
      }
    }

    return sanitizedObj;
  }

  return input;
};
