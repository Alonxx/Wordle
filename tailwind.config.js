/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-smoke": "#F3F3F3",
        "black-blue": "#202537",
        "green-inPosition": "#6AAA64",
        "yellow-notPosition": "#CEB02C",
        "gray-wrong": "#939B9F",
        "gray-smoke-transparent": "rgba(243, 243, 243, 0.89)",
        "gray-concrete": "rgba(147, 155, 159, 0.3);",
        "gray-keyboard": "rgba(218, 220, 224, 0.3);",
        "gray-keycap-bg": "#D3D6DA",
        "gray-keycap-text": "#56575E",
        "blue-dark": "#262b3c",
        "blue-keycap-bg": "#565F7E",
        "blue-dark-light": "rgba(218, 220, 224, 0.03);",
        "blue-dark-transparent": "rgba(38, 43, 60, 0.89);",
        "gray-border": "#939b9f",
      },
    },
  },
  plugins: [],
};
