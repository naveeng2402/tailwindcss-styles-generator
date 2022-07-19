/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/ui/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kitty: "#abc",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
