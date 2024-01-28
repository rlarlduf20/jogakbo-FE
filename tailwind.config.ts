import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main_black: "#151515",
        main_pink: "#ff9898",
        main_yellow: "#ffe381",
        main_green: "#59b86e",
        main_blue: "#7aacf7",
      },
      width: {
        inner: "1200px",
      },
      fontFamily: {
        sans: ["var(--font-SUIT)", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
};
export default config;
