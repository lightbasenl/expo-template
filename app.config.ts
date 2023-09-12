import { ExpoConfig, ConfigContext } from "expo/config";

import packageJson from "./package.json";

const isProd = process.env.APP_VARIANT === "production";

function cleanVersion(str: string) {
  const regex = /-[a-z]+\.\d+/; // matches any hyphen followed by letters and a dot, and then digits
  const replacedStr = str.replace(regex, "");
  return replacedStr;
}

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    // TODO: Update name, to match the name of your app
    name: isProd ? "HelloWorld" : "HelloWorld (S)",
    owner: "lightbase",
    // TODO: Update slug, to match the name of your app
    slug: "helloworld",
    // TODO: Update scheme, to match the name of your app
    scheme: "helloworld",
    // apple rejects apps that are not sem ver compliant versions
    version: process.env.BUILD_TYPE === "store" ? cleanVersion(packageJson.version) : packageJson.version,
    orientation: "portrait",
    icon: "./assets/icon.png",
    // TODO: Update to automatic if the app is to support dark mode
    userInterfaceStyle: "light",
    assetBundlePatterns: ["**/*"],

    runtimeVersion: {
      policy: "nativeVersion",
    },
    androidStatusBar: {
      barStyle: "dark-content",
    },
    androidNavigationBar: {
      barStyle: "dark-content",
    },
    ios: {
      supportsTablet: false,
      config: {
        usesNonExemptEncryption: false,
      },
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },

      buildNumber: process.env.BUILD_NUMBER ?? "1",
      infoPlist: {
        UIViewControllerBasedStatusBarAppearance: true,
        CFBundleAllowMixedLocalizations: true,
      },
      // TODO: Update bundleId, to match the name of your app, retain the staging suffix so staging builds can be installed alongside production builds
      bundleIdentifier: isProd ? "nl.lightbase.app" : "nl.lightbase.app.staging",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      splash: {
        resizeMode: "native",
        image: "./assets/splash.png",
        backgroundColor: "#FFFFFF",
      },
      versionCode: Number(process.env.BUILD_NUMBER ?? "1"),
      // TODO: Update bundleId, to match the name of your app, retain the staging suffix so staging builds can be installed alongside production builds
      package: isProd ? "nl.lightbase.app" : "nl.lightbase.app.staging",
    },
    extra: {},
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",

          config: {
            organization: "lightbasenl",
            // TODO: Replace with new sentry project
            project: "HelloWorld",
            setCommits: true,
          },
        },
      ],
    },
    plugins: [
      "sentry-expo",
      ["@lightbase/native-assets", { folders: ["./assets/fonts"], src: "./src/theme" }],
      ["./modules/expo-transparent-navigation/app.plugin.js", "dark-content"],
      ["expo-build-properties", { android: { minSdkVersion: 27 } }],
    ],
  };
};
