/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern-desktop":
          "url('/src/assets/images/background-desktop.svg')",
        "hero-pattern-mobile":
          "url('/src/assets/images/background-mobile.svg')",
      },
    },
  },
  plugins: [],
};
