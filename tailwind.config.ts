import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px"
      }
    },
    extend: {
         fontFamily: {
    heading: ["Georgia", "serif"],
    body: ["Inter", "sans-serif"],
    button: ["Inter", "sans-serif"],
  }, fontSize: {
    h1: ["40px", { lineHeight: "48px", letterSpacing: "-0.5px" }],
    h4: ["24px", { lineHeight: "32px" }],
    h5: ["20px", { lineHeight: "28px" }],
    h6: ["18px", { lineHeight: "26px" }],
    bodyM: ["16px", { lineHeight: "24px" }],
    buttonM: ["14px", { lineHeight: "20px" }],
    micro: ["12px", { lineHeight: "16px" }],
  },
      colors: {
           heading: "#212121",
    action: "#861212",
    label: "#4F4F4F",

      },
     
    },
  },
  plugins: [],
};

export default config;
