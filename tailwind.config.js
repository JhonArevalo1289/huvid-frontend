/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        huvidGreen: '#1E5B42',
        huvidOrange: '#E67E22',
        huvidRed: '#D32F2F',
        huvidBg: '#F4F6F5',
      }
    },
  },
  plugins: [],
}