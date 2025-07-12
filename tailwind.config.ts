/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#2E7D32",
        mint: "#A5D6A7",
        sun: "#FFEB3B",
        charcoal: "#212121",
        basewhite: "#F5F5F5",
      },
    },
  },
  plugins: [],
}