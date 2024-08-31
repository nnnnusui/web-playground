import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin-ts";
import vitest from "@vitest/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import storybook from "eslint-plugin-storybook";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
// import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
  baseDirectory: "/work",
});

export default [
  ...compat.plugins("import"),
  { ignores: ["dist"] },
  ...tseslint.config({
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...vitest.environments.env.globals,
      },
    },
    plugins: {
      "@stylistic/ts": stylistic,
      "react": react,
      "react-hooks": reactHooks,
      // 'react-refresh': reactRefresh,
      vitest,
      ...compat.plugins("import").plugin,
      "unused-imports": unusedImports,
    },
    settings: {
      react: {
        version: "detect",
      },
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // 'react-refresh/only-export-components': [
      //   'warn',
      //   { allowConstantExport: true },
      // ],
      "arrow-parens": ["warn", "always"],
      "arrow-spacing": "warn",
      "comma-dangle": "off",
      "@stylistic/ts/comma-dangle": ["warn", "always-multiline"],
      "comma-spacing": "warn",
      "eol-last": ["warn", "always"],
      "indent": "off",
      "@stylistic/ts/indent": ["warn", 2, {
        ignoredNodes: [
          "TSTypeParameterInstantiation",
          "TSUnionType",
          "TSIntersectionType",
        ],
      }],
      "key-spacing": "warn",
      "member-delimiter-style": "off",
      "@stylistic/ts/member-delimiter-style": ["warn"],
      "no-multiple-empty-lines": ["warn", {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      }],
      "no-trailing-spaces": "warn",
      "object-curly-spacing": "off",
      "@stylistic/ts/object-curly-spacing": ["warn", "always"],
      "object-property-newline": "warn",
      "operator-linebreak": ["warn", "before"],
      "quotes": "off",
      "@stylistic/ts/quotes": ["warn", "double"],
      "space-before-function-paren": "off",
      "@stylistic/ts/space-before-function-paren": "off",
      "semi": "off",
      "@/semi": "off",
      "@stylistic/ts/semi": "warn",
      "space-infix-ops": "off",
      "@/space-infix-ops": "off",
      "@stylistic/ts/space-infix-ops": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@stylistic/ts/quote-props": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-indent": ["warn", 2],
      "react/self-closing-comp": "warn",
      "react/jsx-tag-spacing": ["warn", {
        closingSlash: "never",
        afterOpening: "never",
        beforeClosing: "proportional-always",
        beforeSelfClosing: "proportional-always",
      }],
      "import/first": "warn",
      // "import/newline-after-import": "warn",
      "import/order": ["warn", {
        groups: [["builtin", "external", "type"], ["internal", "parent", "sibling"], "index", "object"],
        pathGroups: [{
          pattern: "@/**",
          group: "internal",
          position: "before",
        }, {
          pattern: "./**.module.scss",
          group: "index",
          position: "before",
        }],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        distinctGroup: false,
      }],
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": "warn",
    },
  }),
  {
    name: "for tests",
    files: ["**/*.{test,spec}.{ts,tsx}"],
    rules: {
      ...vitest.configs.all.rules,
      "vitest/consistent-test-filename": "off",
    },
  },
  ...storybook.configs["flat/recommended"],
  {
    "files": ["**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
    "rules": {
      "storybook/default-exports": "error",
    },
  },
];
