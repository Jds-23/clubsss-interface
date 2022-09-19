/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EA4527",
        cream: "#FADFC2",
        gray: "#2A2A2A",
        lightGray: "#EBEBEB",
      },
    },
  },
  plugins: [],
};
