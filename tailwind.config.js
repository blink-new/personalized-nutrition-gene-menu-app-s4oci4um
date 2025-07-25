/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00C851",
        accent: "#FF6B35",
        background: "#FAFAFA",
        dark: "#1A1A1A",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "inter-medium": ["Inter-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
}