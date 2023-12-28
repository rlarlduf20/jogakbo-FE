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
        test_green: "#56AD65",
      },
      width: {
        inner: "1200px",
      },
      fontFamily: {
        sans: ["var(--font-SUIT)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
