import { starlightAsides } from "/src/plugins/asides.ts";
import removeH1 from "/src/plugins/removeH1.ts";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://elotoja.com",
  devToolbar: { enabled: process.env.PLAYWRIGHT_TEST !== "1" },
  output: "static",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
  }),
  vite: {
    plugins: [
      Icons({
        compiler: "astro",
        defaultStyle: "font-size: 2em",
        defaultClass: "hover:text-accent",
      }),
      tailwindcss(),
    ],
  },
  integrations: [
    svelte(),
    expressiveCode({
      themes: ["github-dark", "github-light"],
      themeCssSelector: theme => `[data-theme='${theme.type}']`,
      defaultProps: {
        wrap: true,
        overridesByLang: {
          "bash,ps,sh": {
            preserveIndent: false,
          },
        },
      },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [removeH1, ...starlightAsides()],
    }),
  },
});
