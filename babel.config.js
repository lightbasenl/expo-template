module.exports = function (api) {
  const babelEnv = api.env();

  const presets = ["babel-preset-expo"];
  const plugins = [
    [
      "module-resolver",
      {
        alias: {
          // Define your root alias here
          "@": "./src",
          "@module": "./modules",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ];

  if (babelEnv !== "development") {
    plugins.push(["transform-remove-console", { exclude: ["error", "info"] }]);
  }

  return {
    presets,
    plugins,
  };
};
