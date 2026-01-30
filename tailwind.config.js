/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ⚠️ très important
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],       // texte général
        poppins: ["Poppins", "sans-serif"], // titres, logo, headings
      },
    },
  },
  plugins: [],
};
