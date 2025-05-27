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

  // 型注釈必須ルールを追加
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // 関数パラメータと変数宣言に型注釈を必須化
      "@typescript-eslint/typedef": [
        "error",
        {
          parameter: true,
          variableDeclaration: true,
        },
      ],
      // console は dev 時だけ許可、それ以外はエラー
      // "no-console": process.env.NODE_ENV === "development" ? "off" : "error",
      "no-console": "off",
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
