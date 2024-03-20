module.exports = {
  content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        textPrimary: '#0191AE',
        bgSecondary: '#D3EAF0',
        bgHover: '#FF7A59',
        bgOther: '#A4D3E4',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
