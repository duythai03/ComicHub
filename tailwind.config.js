/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "overlay-gradient":
          "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
      },
      spacing: {
        "overlay-height": "40%",
      },
    },
    colors: {
      primary: "#c226f1",
    },
  },
  plugins: [],
};
