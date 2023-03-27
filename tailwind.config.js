/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontSize: {
      xs: "12px",
      sm: "13px",
      base: "1rem",
      lg: "18px",
      xl: "20px",
      "2xl": "22px",
      "3xl": "25px",
      "reg": "15px",
    }
  },
  plugins: [],
}