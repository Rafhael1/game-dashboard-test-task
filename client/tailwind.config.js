/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./src/**/*.{tsx,ts}",
    "./index.html"
  ],
  theme: {
    extend: {},
    screens: {
			'mobile': { 'max': '650px' },
			'tablet': { 'min': '768px', 'max': '1023px' },
			'desktop': { 'min': '1024px' },
			...defaultTheme.screens,
		 },
     colors: {
      'background': 'rgb(45, 47, 60)',
      'background-secondary': 'rgb(48, 50, 65)',
      'primary': 'rgb(107, 105, 250)',
      ...colors,
     }
  },
  plugins: [],
}

