import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1C1C1E",
        charcoal: "#3A3A3C",
        cream: "#F7F3EC",
        gold: "#B08D57",
        grey: "#6E6E73",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "22px",
        "2xl": "27px",
        "3xl": "32px",
        "4xl": "40px",
        "5xl": "56px",
        "6xl": "64px",
      },
      borderRadius: {
        DEFAULT: "4px",
      },
      spacing: {
        section: "120px",
        "section-tablet": "80px",
        "section-mobile": "56px",
      },
      maxWidth: {
        content: "1200px",
        hero: "760px",
        legal: "760px",
      },
      transitionDuration: {
        150: "150ms",
        200: "200ms",
        250: "250ms",
        400: "400ms",
      },
    },
  },
  plugins: [],
};
export default config;
