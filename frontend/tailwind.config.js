/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dprimary": "#1552CF",
        "dsecondary": "#1D1D21",
        "ddarkblue": "#0C317C",
        "dblue": "#1962F9",
        "dlightblue": "#F8FAFF",
        "dwhite": "#FFFFFF",
        "dgrey": "#D6D6D6",
        "dlightblack": "#383838",
        "dblack": "#101010",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        corporate: {
          ...require("daisyui/src/colors/themes")["[data-theme=corporate]"],
          "primary": "#1552CF",
          "base-100": "#ffffff",
          "bg-base-100": "#d6d6d6"
        },
      },
    ],
  },
};
