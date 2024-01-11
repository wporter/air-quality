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
          black: "#1D1D1D",
          green: "#165C21",
          "blue-100": "#4D99DF",
          "blue-200": "#006DD1",
        },

        status: {
          green: "#2ED47A",
          red: "#FF5372",
        },
      },
    },
  },
  plugins: [],
};
