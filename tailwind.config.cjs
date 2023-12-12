/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      main: ["'Fira Code Variable'", "sans-serif"],
    }
  },
  darkMode: "class",
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/theming/themes")["night"],
        },
        light: {
          ...require("daisyui/src/theming/themes")["fantasy"],
        }
      }
    ]
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
