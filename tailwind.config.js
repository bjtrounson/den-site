/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#21180b",
        light: "#e8dda5",
        "dark-highlight": "#14261a",
        "light-highlight": "#66825d",
        "gradient-light": "#332b14",
        "gradient-dark": "#19180b",
      },
      backgroundImage: {
        'minecraft-background': "linear-gradient(transparent, #332b14), url('/minecraft-background.png')",
      }
    },
  },
  plugins: [],
}
