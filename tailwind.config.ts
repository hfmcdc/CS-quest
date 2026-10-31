import type { Config } from "tailwindcss";

/**
 * The whole app is written with Tailwind's `slate` scale. Re-defining it here re-skins every screen at once
 * (deeper ink backgrounds, quieter borders, higher-contrast secondary text) without touching each component.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#f7f8fc", 100: "#eef0f8", 200: "#dde1ef", 300: "#bcc2d8", 400: "#9199b5",
          500: "#7a82a0", 600: "#4b5270", 700: "#2c3149", 800: "#1c2033", 900: "#12152a", 950: "#0a0c1a",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      transitionTimingFunction: { out: "cubic-bezier(.2,.7,.2,1)" },
    },
  },
  plugins: [],
};
export default config;
