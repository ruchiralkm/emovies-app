module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gradientColorStops: (theme) => ({
        gray: {
          800: theme("colors.gray.800"),
          900: theme("colors.gray.900"),
        },
      }),
    },
  },
  plugins: [],
};
