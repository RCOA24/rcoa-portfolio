/** @type {import('tailwindcss').Config} */
// Tailwind supplies the Preflight reset and the occasional utility; the design system lives in src/index.css.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
