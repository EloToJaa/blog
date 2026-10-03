import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginSvelte from "eslint-plugin-svelte";
import globals from "globals";

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      ".vercel/**",
      "playwright-report/**",
      "test-results/**",
      "coverage/**",
    ],
  },
  js.configs.recommended,
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginSvelte.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,ts,astro,svelte}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: { "no-unused-vars": "warn" },
  },
  {
    files: ["**/*.ts"],
    languageOptions: { parser: tsParser },
    rules: { "no-undef": "off" },
  },
  {
    files: ["**/*.{astro,svelte}"],
    languageOptions: { parserOptions: { parser: tsParser } },
  },
];
