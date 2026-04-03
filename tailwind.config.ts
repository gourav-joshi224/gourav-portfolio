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
        bg: "#080808",
        surface: "#0f0f0f",
        card: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.06)",
        "border-hover": "rgba(0,255,135,0.3)",
        accent: "#00ff87",
        "accent-dim": "rgba(0,255,135,0.08)",
        amber: "#ffb800",
        primary: "#e8e8e8",
        muted: "#444444",
        dim: "#222222",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
