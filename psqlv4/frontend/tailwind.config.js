const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [flowbite.content()],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
