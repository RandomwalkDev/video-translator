/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // Include your main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/React files inside src
  ],
  theme: {
    extend: {
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-medium": "float-medium 5s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

