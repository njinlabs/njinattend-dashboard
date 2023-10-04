/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["'Montserrat'", "sans-serif"],
        "nunito-sans": ["'Nunito Sans'", "sans-serif"],
        roboto: ["'Roboto'", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#fff2cc",
          200: "#ffe599",
          300: "#ffd966",
          400: "#ffcc33",
          500: "#ffbf00",
          600: "#cc9900",
          700: "#997300",
          800: "#664c00",
          900: "#332600",
        },
      },
    },
  },
  plugins: [],
};
