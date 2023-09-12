import * as Updates from "expo-updates";

// TOOD: Add the env variables for the app here so they can be used in the app and will have auto complete
// process.env.EXPO_PUBLIC_SENTRY_DSN for example can be used in the app
const Config = {
  APP_ENV: "staging",
  SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
};

if (Updates.channel === "production" || process.env.APP_VARIANT === "production") {
  Config.APP_ENV = "production";
}

export default Config;
