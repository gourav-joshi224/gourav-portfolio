import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        border: "var(--border)",
        borderStrong: "var(--border-strong)",
        borderHover: "var(--border-hover)",
        accent: "var(--accent)",
        accent2: "var(--accent-2)",
        accentDim: "var(--accent-dim)",
        amber: "var(--amber)",
        danger: "var(--danger)",
        text1: "var(--text-1)",
        text2: "var(--text-2)",
        text3: "var(--text-3)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
