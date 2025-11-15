/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'brand-primary': '#606060',      // Dark Grey from logo
        'brand-secondary': '#F2C41D',    // Yellow from logo
        'brand-accent': '#D81E05',       // Red from logo
        'text-light': '#FFFFFF',         // Neutral White
        'text-dark': '#4A4A4A',          // For body copy
        'bg-light': '#F9F9F9',         // For subtle backgrounds
        'bg-warm-light': '#FFF9E5',    // Light cream for gradients, from gold-tint
        
        // Deprecating old color names
        'primary-gold': '#F2C41D',
        'accent-red': '#D81E05',
        'primary-text': '#4A4A4A',
        'secondary-text': '#7D7D7D',
        'base-white': '#FFFFFF',
        'base-light-gray': '#F9F9F9',
        'gold-light-bg': 'rgba(242, 196, 29, 0.1)',
        'light-orange': '#FFE8CC',
        // Legacy aliases for backward compatibility
        gold: {
          DEFAULT: '#F2C41D',
          deep: '#C79A12',
          tint: '#FFF9E5',
          'light-hover': '#FFF5D1',
        },
        charcoal: {
          DEFAULT: '#4A4A4A',
          light: '#7D7D7D',
          dark: '#1F2226',
        },
        ivory: '#FFFFFF',
        'accent-red-legacy': '#D81E05',
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
        'level-1': '0 2px 10px rgba(242, 196, 29, 0.15)',
        'level-2': '0 4px 14px rgba(242, 196, 29, 0.25)',
        'level-3': '0 10px 40px rgba(242, 196, 29, 0.25)',
        'level-4': '0 12px 60px rgba(242, 196, 29, 0.2)',
        'card-hover': '0 6px 24px rgba(242, 196, 29, 0.2)',
        'ranker-badge': '0 3px 12px rgba(242, 196, 29, 0.4)',
        'scroll': '0px 4px 20px rgba(242, 196, 29, 0.15)',
        'golden-rim': '0 0 8px rgba(242, 196, 29, 0.5)',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(.2,.8,.2,1)',
      },
      transitionDuration: {
        'fast': '180ms',
      },
    },
  },
  plugins: [],
}
