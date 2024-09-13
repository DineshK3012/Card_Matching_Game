const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      animation:{
        'bounce-twice': 'bounce 1s ease-in-out',
      }
    },
  },
  plugins: [
    // ...
    flowbite.plugin(),
  ],
}