/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'background-light': 'var(--background-light)',
        'foreground': 'var(--foreground)',
        'primary': 'var(--primary)',
        'primary-light': 'var(--primary-light)',
      }
    },
  },
  plugins: [],
}
