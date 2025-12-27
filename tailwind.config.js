/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { bg: '#0b1220', card: '#111729', brand:'#2dd4bf' }
    }
  },
  plugins: [],
}
