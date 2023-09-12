module.exports = {
  root: true,
  extends: ["universe/native", "universe/shared/typescript-analysis", "plugin:prettier/recommended"],
  env: { jest: true, node: true },
  ignorePatterns: ["**/generated/**"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],

  rules: {
    curly: "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        enableDangerousAutofixThisMayCauseInfiniteLoops: true,
        additionalHooks:
          "(useAnimatedStyle|useAnimatedProps|useDerivedValue|useAnimatedGestureHandler|useStyle)",
      },
    ],
  },
};
