import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            'h1, h2, h3, h4': {
              color: '#fff',
            },
            blockquote: {
              borderLeftColor: '#3f3f46',
              color: '#d4d4d8',
            },
            hr: {
              borderColor: '#3f3f46',
            },
            strong: {
              color: '#fff',
            },
            code: {
              color: '#fff',
            },
            pre: {
              backgroundColor: '#18181b',
              code: {
                color: '#fff',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
};
export default config;
