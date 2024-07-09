import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#1EB854",
        },
        secondary: {
          base: "#27272A",
        },
        background: {
          base: "#18181B",
        },
        foreground: {
          base: "#CCCBCD",
        },
      },
      fontFamily: {
        body: [`var(--font-ubuntu)`],
      },
    },
  },
  plugins: [typography],
};
export default config;
