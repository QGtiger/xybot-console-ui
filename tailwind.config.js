/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'ui-',
  theme: {
    extend: {},
  },
  plugins: [require('./src/tailwindcss-xybot-component.js')],
  safelist: [
    {
      pattern: /^ui-btn-*/,
    },
  ],
};
