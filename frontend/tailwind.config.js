/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { poppins: ["var(--font-poppins)"] },
      colors: {
        mustard: {
          light: ["var(--mustard-light)"],
          dark: ["var(--mustard-dark)"],
        },
        turquoise: {
          light: ["var(--turquoise-light)"],
          dark: ["var(--turquoise-dark)"],
        },
        rose: {
          light: ["var(--rose-light)"],
          dark: ["var(--rose-dark)"],
        },
        violet: {
          light: ["var(--violet-light)"],
          dark: ["var(--violet-dark)"],
        },
      },
    },
  },
  plugins: [],
};
