/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/tailwind.css", "./dist/*"],
  theme: {
    extend: {},
    
  },
  plugins: [
    require('tailwindcss'),
    require('tailwindcss-gradients'),
    // ... other plugins
  ],
}

