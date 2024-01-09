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
          blue: "#006DD1",
          blue2: "#4D99DF",
        },

        status: {
          green: "#D8FAE7",
          red: "#FFEEF1",
        },
      },
    },
  },
  plugins: [],
};
