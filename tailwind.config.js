/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // <--- ЭНЭ МӨР ХАМГИЙН ЧУХАЛ
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce-slow 1s ease-in-out infinite',
        'character-happy': 'character-happy 0.5s ease-in-out infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'character-happy': {
          '0%, 100%': { transform: 'scale(1) rotate(-2deg)' },
          '50%': { transform: 'scale(1.05) rotate(2deg)' },
        },
      },
    },
  },
  plugins: [],
}