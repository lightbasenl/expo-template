import { AxiosError, isAxiosError } from "axios";
import * as SentryExpo from "sentry-expo";

import Config from "@/env";

export const Sentry = SentryExpo.Native;
export const routingInstrumentation = new Sentry.ReactNavigationInstrumentation();

SentryExpo.init({
  enableInExpoDevelopment: false,
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  environment: Config.SENTRY_DSN,
  // Allow displaying large validation error objects
  normalizeDepth: 10,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.ReactNativeTracing({
      // Pass instrumentation to be used as `routingInstrumentation`
      routingInstrumentation,
      // ...
    }),
  ],
  beforeSend: (event, hint) => {
    // https://docs.sentry.io/platforms/react-native/configuration/filtering/#filtering-error-events
    const originalException = hint.originalException;
    if (event.message === "Network Error") {
      return null;
    } else if (originalException && isAxiosError(originalException)) {
      const responseData = originalException.response?.data;

      if (responseData) {
        if (responseData?.code >= 500 && !responseData?.key) {
          return null;
        }
      }
    }

    return event;
  },
});

export function errorReporting(error: AxiosError<any>) {
  if (error.message === "Network Error") {
    return null;
  }
  if (!error.response) {
    // Catch non AxiosError errors caused by invalid react query hooks, normally type errors
    Sentry.captureException(error, (scope) => {
      scope.setTransactionName(`Error in react query error reporting flow`);
      return scope;
    });
  } else {
    const errorCode = error?.response?.data?.ErrorCode || error.response?.status;

    const url = error.response?.config?.url ?? "";
    let grouping = ["{{ default }}"];

    // ensures endpoints with specific errorCodes are grouped separately for easier debugging
    if (errorCode) {
      // TODO: remove all numbers from url in grouping so dynamic params dont effect grouping
      grouping = ["{{ default }}", errorCode.toString(), url];
    }
    Sentry.captureException(error, (scope) => {
      // Sets sentry error titles and groups based on error code, method and url
      scope.setTransactionName(`[${errorCode} ${error.response?.config.method}] - ${url}`);
      if (grouping) {
        scope.setFingerprint(grouping);
      }
      scope.setExtras({
        type: "error",
        data: error.response?.data,
        configData: error.response?.config,
        status: error.response?.status,
      });
      return scope;
    });
  }
}
