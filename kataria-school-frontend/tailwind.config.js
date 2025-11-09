/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F2C230',
          deep: '#C79A12',
          tint: '#FFF9E5',
          'light-hover': '#FFF5D1',
        },
        charcoal: {
          DEFAULT: '#4B4F54',
          light: '#3A3E42',
          dark: '#1F2226',
        },
        ivory: '#FAF8F0',
        'accent-red': '#C62828',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        'base': '8px',
        'lg': '12px',
        'xl': '14px', // From card spec
        '2xl': '18px',
      },
      boxShadow: {
        'level-1': '0 2px 10px rgba(0,0,0,0.06)', // Cards
        'level-2': '0 4px 14px rgba(242,194,48,0.25)', // Buttons
        'level-3': '0 10px 40px rgba(242,194,48,0.25)', // Hero glow
        'level-4': '0 12px 60px rgba(0,0,0,0.45)', // Modals
        'card-hover': '0 6px 24px rgba(0,0,0,0.12)',
        'ranker-badge': '0 3px 12px rgba(242,194,48,0.4)',
        'scroll': '0px 4px 20px rgba(0,0,0,0.08)',
        'golden-rim': '0 0 8px rgba(242,194,48,0.5)',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(.2,.8,.2,1)',
      },
      transitionDuration: {
        'fast': '180ms',
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
