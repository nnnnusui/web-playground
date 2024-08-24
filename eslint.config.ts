/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
// import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: "/work",
} as any);

export default tseslint.config(
  ...compat.plugins("import"),
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react": react,
      "react-hooks": reactHooks as any,
      ...compat.plugins("import").plugin as any,
      // 'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules as any,
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],
      "arrow-parens": ["warn", "always"],
      "arrow-spacing": "warn",
      "comma-dangle": ["warn", "always-multiline"],
      "comma-spacing": "warn",
      "eol-last": ["warn", "always"],
      "key-spacing": "warn",
      "no-multiple-empty-lines": ["warn", {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      }],
      "no-trailing-spaces": "warn",
      "object-curly-spacing": ["warn", "always"],
      "object-property-newline": "warn",
      "operator-linebreak": ["warn", "before"],
      "quotes": ["warn", "double"],
      "indent": "off",
      "@/indent": ["warn", 2, {
        ignoredNodes: [
          "TSTypeParameterInstantiation",
          "TSUnionType",
          "TSIntersectionType",
        ],
      }],
      "semi": "off",
      "@/semi": "warn",
      "space-infix-ops": "off",
      "@/space-infix-ops": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-indent": ["warn", 2],
      "react/self-closing-comp": "warn",
      "react/jsx-tag-spacing": ["warn", {
        closingSlash: "never",
        afterOpening: "never",
        beforeClosing: "proportional-always",
        beforeSelfClosing: "never",
      }],
      "import/first": "warn",
      // "import/newline-after-import": "warn",
      "import/order": ["warn", {
        groups: [["builtin", "external"], ["object", "internal"], "sibling", "type", "index"],
        pathGroups: [],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        distinctGroup: false,
      }],
    },
  },
);
