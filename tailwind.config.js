/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
      colors: {
        'primary-500': '#1F618D', // Biru Tua
        'primary-600': '#17202A', // Hitam
        'secondary-500': '#3498DB', // Biru Terang
        'off-white': '#D5DBDB', // Biru Abu-abu
        'red': '#FF5A5A', // Merah
        'dark-1': '#000000', // Hitam
        'dark-2': '#17202A', // Hitam (Lainnya)
        'dark-3': '#212F3D', // Hitam (Lebih Terang)
        'dark-4': '#2E4053', // Hitam (Lebih Terang)
        'light-1': '#FFFFFF', // Putih
        'light-2': '#E5E7E9', // Biru Muda
        'light-3': '#7B7D7D', // Biru Abu-abu
        'light-4': '#85929E', // Biru Abu-abu
      },
      screens: {
        'xs': '480px',
      
      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],

      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
