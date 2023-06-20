/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        zen: ["Zen Maru Gothic"],
      },
      colors: {
        'cpt-text': '#c6d0f5',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@catppuccin/tailwindcss'),
  ],
}

