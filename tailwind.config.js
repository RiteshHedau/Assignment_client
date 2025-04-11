/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      keyframes: {
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%) scale(0.9)", opacity: 0 },
          "100%": { transform: "translateY(0) scale(1)", opacity: 1 },
        },
        "slide-out": {
          "0%": { transform: "translateY(0) scale(1)", opacity: 1 },
          "100%": { transform: "translateY(-100%) scale(0.9)", opacity: 0 },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        "toast-slide-in": {
          "0%": { transform: "translateY(-100%) scale(0.9)", opacity: 0 },
          "100%": { transform: "translateY(0) scale(1)", opacity: 1 },
        },
        "toast-slide-out": {
          "0%": { transform: "translateY(0) scale(1)", opacity: 1 },
          "100%": { transform: "translateY(-100%) scale(0.9)", opacity: 0 },
        },
        "success-icon": {
          "0%": { transform: "scale(0.6)" },
          "50%": { transform: "scale(1.4)" },
          "100%": { transform: "scale(1)" },
        },
        "error-shake": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-12deg)" },
          "75%": { transform: "rotate(12deg)" },
        },
      },
      animation: {
        gradient: "gradient 8s ease infinite",
        enter: "enter 0.2s ease-out",
        leave: "leave 0.15s ease-in forwards",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-out": "slide-out 0.3s ease-in forwards",
        shake: "shake 0.5s ease-in-out",
        "toast-slide-in": "toast-slide-in 0.3s ease-out",
        "toast-slide-out": "toast-slide-out 0.3s ease-in forwards",
        "success-icon": "success-icon 0.65s ease-out",
        "error-shake": "error-shake 0.5s ease-in-out",
      },
      scale: {
        102: "1.02",
      },
    },
  },
  plugins: [],
};
