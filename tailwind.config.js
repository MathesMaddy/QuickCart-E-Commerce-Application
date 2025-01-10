/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        
        'xs': '380px', 
        '3xl': '1920px', 
      }
    },
  },
  plugins: [    
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
}

