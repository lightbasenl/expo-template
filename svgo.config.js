module.exports = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    {
      name: "removeAttrs",
      params: { attrs: "class" },
    },
    {
      name: "removeAttrs",
      params: { attrs: "style" },
    },

    "removeXMLNS",
  ],
};
