/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          // secondary: "297, 64%, 28%",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          secondary: "hsl(38.86 90.72% 61.96%)",
        },
      },
    ],
  },
};
