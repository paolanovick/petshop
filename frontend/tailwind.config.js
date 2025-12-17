/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#a73132", // Rojo exacto del logo
        primaryDark: "#8a2728", // Hover state más oscuro
        primaryLight: "#c94b4c", // Acentos más claros
        dark: "#1F2937", // Gray-800
        light: "#F3F4F6", // Gray-100
        silver: "#9ca3af", // Gris medio (gray-400)
        silverLight: "#d1d5db", // Gris claro (gray-300)
        silverDark: "#6b7280", // Gris oscuro (gray-500)
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Adlery Pro Blockletter", "Impact", "sans-serif"], // Para el nombre de la tienda
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
