import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#121E20",
        surface: "#1C1E22",
        "surface-high": "#274045",
        primary: "#135D6C",
        "on-surface": "#E1E3E4",
        "on-surface-variant": "#97BDC4",
        outline: "#274045",
        success: "#4CAF50",
        warning: "#F2A154",
        danger: "#E63946",
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.18)",
        glow: "0 0 18px rgba(19,93,108,0.25)",
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "Manrope", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
