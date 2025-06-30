module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        discord: {
          background: '#313338',
          surface: '#23272a',
          primary: '#5865f2',
          accent: '#57f287',
          danger: '#ed4245',
        },
      },
      fontFamily: {
        sans: ['Whitney', 'Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        discord: '0 4px 24px 0 rgba(88,101,242,0.15)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
