import js from "@eslint/js";
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginSvelte from 'eslint-plugin-svelte';

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs["flat/recommended"],
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
      "no-unused-vars": "warn"
    }
  }
];
