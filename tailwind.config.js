/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          50: "#FFF0E4",
          500: "#EB602D",
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
}