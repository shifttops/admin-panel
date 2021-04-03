module.exports = {
  babel: {
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            constants: "./src/constants",
            icons: "./src/icons",
            images: "./src/images",
            pages: "./src/pages",
            scss: "./src/scss",
            types: "./src/types",
          },
        },
      ],
    ],
  },
};
