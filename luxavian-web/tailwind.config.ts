import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        surface: "#101014",
        "surface-raised": "#16161C",
        accent: {
          DEFAULT: "#4F46E5",
          soft: "#6366F1",
        },
        secondary: "#3B82F6",
        line: "rgba(255,255,255,0.08)",
        "line-strong": "rgba(255,255,255,0.14)",
        muted: "#A1A1AA",
        subtle: "#71717A",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      maxWidth: {
        content: "72rem",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "slow-drift": "slow-drift 18s ease-in-out infinite alternate",
      },
      keyframes: {
        "slow-drift": {
          "0%": { transform: "translate3d(-4%, -2%, 0) scale(1)" },
          "100%": { transform: "translate3d(4%, 3%, 0) scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
