/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1B4332",
        sage: "#87A878",
        moss: "#2D6A4F",
        pond: "#40916C",
        blush: "#F8F6F1",
        cream: "#FEFDFB",
        charcoal: "#1A1A1A",
        beige: "#E8E4DC",
        farmPink: "#D4A373",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}