import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";
import removeH1 from "/src/plugins/removeH1.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://elotoja.com",
  output: "hybrid",
  adapter: cloudflare({
    mode: "directory",
  }),
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
        defaultStyle: "font-size: 1.5em",
        defaultClass: "hover:text-accent",
      }),
    ],
  },
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    expressiveCode({
      themes: ["github-dark", "github-light"],
      themeCssSelector: theme => `[data-theme='${theme.type}']`,
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [removeH1],
  },
  redirects: {
    "/github": "https://github.com/elotojaa",
    "/linkedin": "https://www.linkedin.com/in/elotoja/",
  },
});
