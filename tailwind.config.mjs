/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sage: {
          500: "#9AAE92",
        },
        cream: {
          100: "#F7F6F2",
        },
        beige: {
          500: "#E7DEC5",
        },
        darkGreen: {
          500: "#4A5A49",
        },
      },
    },
  },
  plugins: [],
};
