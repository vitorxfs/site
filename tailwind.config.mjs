/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat Variable', ...defaultTheme.fontFamily.sans],
        serif: ['Yeseva One', ...defaultTheme.fontFamily.serif],
        icon: ['Material Symbols Rounded'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
