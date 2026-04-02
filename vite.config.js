export default {
  base: "/",
  build: {
    modulePreload: false,
  },
  optimizeDeps: {
    exclude: ["cubing"],
  },
};
