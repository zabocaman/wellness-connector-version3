import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#20362f",
        forest: "#315f50",
        sage: "#8ea99c",
        mist: "#dfe9e3",
        cream: "#f7f4ed",
        sand: "#e9dfd0",
        sky: "#dce9ed",
        clay: "#b46f58"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(41, 69, 59, 0.08)",
      },
    },
  },
  plugins: [],
} satisfies Config;
