import * as Updates from "expo-updates";
import { ReactNode, useEffect, useRef } from "react";
import { AppState } from "react-native";

import { Sentry } from "@/services/sentry";

export const UpdatesProvider = ({ children }: { children: ReactNode }) => {
  const updatesEnabled = useRef(true);
  const prevAppState = useRef("");

  useEffect(() => {
    const appstate = AppState.addEventListener("change", async (nextAppState) => {
      // only recheck when returning to active state
      if (
        updatesEnabled.current &&
        prevAppState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        try {
          const { isAvailable } = await Updates.checkForUpdateAsync();

          if (isAvailable) {
            const { isNew, manifest } = await Updates.fetchUpdateAsync();
            if (isNew) {
              Sentry.addBreadcrumb({ message: "Installing new Expo Update", data: { manifest } });
              await Updates.reloadAsync();
            }
          }
        } catch (error) {
          Sentry.addBreadcrumb({ message: `Error checking for updates ${(error as Error).message}` });
        }
      }
      prevAppState.current = nextAppState;
    });
    return () => appstate.remove();
  }, []);

  return children;
};
