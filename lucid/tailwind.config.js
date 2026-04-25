/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        background: { light: '#FFFFFF', DEFAULT: '#0A0A0A' },
        card: { light: '#F5F5F5', DEFAULT: '#111111' },
        border: { light: '#E0E0E0', DEFAULT: '#222222' },
        text: { primary: { light: '#0A0A0A', DEFAULT: '#F5F5F5' }, muted: { light: '#6B7280', DEFAULT: '#9CA3AF' } },
        score: { green: '#22C55E', lime: '#84CC16', amber: '#EAB308', red: '#EF4444' },
      },
      letterSpacing: {
        wide: '0.3em',
        wider: '0.4em',
      },
    },
  },
  plugins: [],
}

