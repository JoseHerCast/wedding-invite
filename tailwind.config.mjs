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
          "500": "#9AAE92",
          "600": "#8B9D84",
          "700": "#7D8D76",
          "800": "#6F7D68",
          "900": "#616D5A"
        },
        cream: {
          100: "#F7F6F2",
        },
        lightSage: {
          500: "#f4ffea",
        },
        darkGreen: {
          500: "#4A5A49",
        },
        blackOlive: {
          500: "#42502FFF",
        },
        oldGold: {
          300: "#cea350FF",
          500: "#846008FF"
        },
        beige: {
          500: "#EDE3D2FF"
        },
        wood: {
          "oakLight": "#D7B899",
          "walnutMedium": "#9C6B4F",
          "cedar": "#B88A5B",
          "elmSmoky": "#7B5D44",
          "mahoganySoft": "#6D4C41",
          "ashBleached": "#E7D7C1",
          "walnutDark": "#5A3E36"
        }
      },
      fontFamily: {
        greatVibes: ['var(--font-greatVibes)', 'cursive'],
        playfairDisplay: ['var(--font-playfairDisplay)', 'serif']
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
  experimental: {
    optimizeCss: true,
  },
};
