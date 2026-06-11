module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#182027",
        mist: "#4A5B6A",
        cream: "#F5F0E8",
        pool: "#45B8AC",
        wood: "#5C4634",
        sage: "#9BAE9A",
        ivory: "#FFFDF8"
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(24, 32, 39, 0.12)",
        glow: "0 22px 70px rgba(69, 184, 172, 0.24)"
      }
    }
  },
  plugins: []
};
