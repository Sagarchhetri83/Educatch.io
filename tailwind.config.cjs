/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        skyBlue: '#9ED7FF',
        warmYellow: '#FFE08A',
        mintGreen: '#B9F0C9',
        lavender: '#E8D6FF',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.06)'
      },
      fontFamily: {
        poppins: ['Poppins', 'Nunito', 'ui-sans-serif', 'system-ui'],
        nunito: ['Nunito', 'Poppins', 'ui-sans-serif', 'system-ui']
      }
    },
  },
  plugins: [],
}

