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
          primary: "#008aff",
          "primary-content": "#000716",
          secondary: "#00a100",
          "secondary-content": "#000900",
          accent: "#0084d1",
          "accent-content": "#000610",
          neutral: "#1e151d",
          "neutral-content": "#cdcacc",
          "base-100": "#262626",
          "base-200": "#202020",
          "base-300": "#191919",
          "base-content": "#cfcfcf",  
          info: "#0094c2",   
          "info-content": "#00080e", 
          success: "#00e0ab",   
          "success-content": "#00120b",   
          warning: "#ffc900",
          "warning-content": "#160f00",
          error: "#ed0030",    
          "error-content": "#140001",
        },
        // light: {
        //   ...require("daisyui/src/theming/themes")["fantasy"],
        // }
      }
    ]
  },
  plugins: [require("@tailwindcss/typography")/* , require("daisyui") */],
};
