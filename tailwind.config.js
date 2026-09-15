export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Anton", "Impact", "sans-serif"],
        sans: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
