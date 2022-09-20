/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.{html,js,css}",
  "./views/**/*.ejs",],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/public/images/onion-splash.jpg')",
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
