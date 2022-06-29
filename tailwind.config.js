/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'content': '#f6f9f8'
      }
    },
    fontFamily: {
      bin: 'BIN',
    },
  },
  plugins: [],
};
