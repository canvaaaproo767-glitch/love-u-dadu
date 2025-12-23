import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
      colors: {
        magazine: {
          bg: '#FAF9F6',       // Off-white background
          accent: '#A97C50',   // Gold/Amber color
          dark: '#292524',     // Dark text
          muted: '#78716c',    // Muted text
          brown: '#8B5E3C',    // Footer brown
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;