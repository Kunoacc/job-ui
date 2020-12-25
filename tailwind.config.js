const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./pages/**/*.tsx', './components/**/*.tsx'],
    options: {
      safelist: ['col-span-1', 'col-span-2', 'col-span-3', 'col-span-4'].map(cls => ([cls, `sm:${cls}`, `md:${cls}`, `lg:${cls}`]).flat()).flat(),
    },
  },
  darkMode: false, // or 'media' or 'class'
  
  theme: {
    extend: {
      colors: {
        teal: colors.teal
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
