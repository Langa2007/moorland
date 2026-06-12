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
        ivory: "#FFFDF8",
        line: "#D9D1C5"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(24, 32, 39, 0.10)"
      }
    }
  },
  plugins: []
};
