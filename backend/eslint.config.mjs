import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 追加ルール
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // 戻り値の型が明示されていない関数に警告を出す (frontend、backend共用)
      "@typescript-eslint/explicit-function-return-type": ["warn"],

      // console は 本番時は禁止、開発時のみ
      // "no-console": "error",
      "no-console": "off",

      // 型に関することは関数内に宣言禁止
      "no-restricted-syntax": [
        "error",
        {
          selector: "FunctionDeclaration TSInterfaceDeclaration",
          message: "関数内でinterfaceを定義しないでください",
        },
        {
          selector: "FunctionDeclaration TSTypeAliasDeclaration",
          message: "関数内でtypeを定義しないでください",
        },
        {
          selector: "FunctionDeclaration ClassDeclaration",
          message: "関数内でclassを定義しないでください",
        },
      ],

      // 1ファイル、1関数あたりの行数制限（読みにくいので）
      "max-lines": ["warn", 500],
      "max-lines-per-function": ["warn", 500],

      // ネスト制限 (読みにくいので）
      "max-depth": ["warn", 3],
    },
  },
];

export default eslintConfig;
