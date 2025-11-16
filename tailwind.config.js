/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "main": "rgba(255,255,255,0.8)",

        "sub": "#888",

        "main-dark1": "rgba(255,255,255,0.6)",
        "main-dark2": "rgba(255,255,255,0.3)",
        "main-dark3": "rgba(255, 255, 255, 0.03)",

        "changing": "#0CBC4D",
        "222": "#222",
        "333": "#333",
        "444": "#444",

        "bg-sub": "#292929",

        primary: "rgb(35, 131, 226)",
        bg: "#191919",
        "list-bg": "#202020",
        border: "#2a2a2a",
      },
      aspectRatio: {
        "2/3": "2/3",
        "3/2": "3/2",
        "3/4": "3/4",
      },

      padding: {
        18: 72,
      },
    },
  },
  plugins: [],
};
