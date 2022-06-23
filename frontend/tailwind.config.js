module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        auth: "url('/src/static/auth-bg.png')",
      },
      colors: {
        auth: "#0b454f",
        orange: "#FF6A3D",
      },
    },
    screens: {
      phone: { max: "639px" },

      tablet: { max: "1024px" },

      desktop: { max: "1280px" },
    },
    plugins: [],
  },
};
