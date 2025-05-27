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

  // 追加 型注釈必須ルール
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // 関数パラメータと変数宣言に型注釈を必須化
      /*
      "@typescript-eslint/typedef": [
        "error",
        {
          parameter: true,
          variableDeclaration: true,
        },
      ],
      */
      // console は 本番時は禁止、開発時のみ
      // "no-console": "error",
      "no-console": "off",

      // 関数内の型宣言は不可
      "no-restricted-syntax": [
        "error", // interface
        { selector: "FunctionDeclaration TSInterfaceDeclaration" },
        { selector: "FunctionExpression TSInterfaceDeclaration" },
        { selector: "ArrowFunctionExpression TSInterfaceDeclaration" },

        // type alias
        { selector: "FunctionDeclaration TSTypeAliasDeclaration" },
        { selector: "FunctionExpression TSTypeAliasDeclaration" },
        { selector: "ArrowFunctionExpression TSTypeAliasDeclaration" },

        // class
        { selector: "FunctionDeclaration ClassDeclaration" },
        { selector: "FunctionExpression ClassDeclaration" },
        { selector: "ArrowFunctionExpression ClassDeclaration" },
      ],
    },
  },
];

export default eslintConfig;
