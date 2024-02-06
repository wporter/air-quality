/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        air: {
          "black-100": "#1D1D1D",
          "black-200": "#383838",
          "black-300": "#282828",
          green: "#165C21",
          "blue-100": "#4D99DF",
          "blue-200": "#006DD1",
          "blue-300": "#C9E4F3",
          "blue-400": "#8DC7E8",
          "white-100": "#F9F9F9",
          grey: "#6A707E",
        },

        status: {
          green: "#2ED47A",
          red: "#FF5372",
        },

        sensor: {
          green: "#D8FAE7",
          red: "#FFEEF1",
        },

        nav: {
          black: "#363636",
          grey: "#898989",
          hover: "#F4F4F4",
        },

        dropdown: {
          grey: "#F3F3F3",
        },
      },
    },
  },
  plugins: [],
};
