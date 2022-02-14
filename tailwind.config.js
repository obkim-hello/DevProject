// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        "sans-pro": ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
        "Teko-l": ['"TekoLight"'],
        "Teko-m": ['"TekoMedium"'],
        "anc-ul": ['"AvenirNextCondensedUltraLight"'],
        "Poppins-l": ['"PoppinsLight"'],
        "Poppins-el": ['"PoppinsExtraLight"'],
        "Poppins-m": ['"PoppinsSemiBoldItalic"'],
        // CN: ['"SourceHanSansCN-ExtraLight-2"'],
      },
    },
  },
  variants: {
    extend: {},
  },
};
