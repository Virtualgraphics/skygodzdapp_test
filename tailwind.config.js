/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

     

      fontFamily: {
        Cinzel: ["Cinzel","Decorativ"],
        Proza: ["Proza Libre", "sans-serif"],
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "960px",
        lg: "1200px",
        xl: "1700px",
      },
    


    },
  },
  plugins: [],
};