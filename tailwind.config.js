/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary-start': '#6366F1',
        'primary-end': '#8B5CF6',
        'dark-bg': '#0F172A',
        'dark-text': '#F8FAFC'
      },
      fontFamily: {
        headings: ['Poppins', 'Inter', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'Roboto', 'sans-serif'],
        mono: ['Monospace']
      }
    },
  },
  plugins: [],
}
