/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/Pages/**/*.{js,ts,jsx,tsx}",
    // "./src/Components/**/*.{js,ts,jsx,tsx}",
    // "./src/Layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Poppins:['Poppins']
      }
    },
  },
  plugins: [],
};
