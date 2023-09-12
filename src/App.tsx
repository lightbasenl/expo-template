import { ThemeProvider } from "@lightbase/rn-design-system";
import * as SplashScreen from "expo-splash-screen";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { ReactQueryClientProvider } from "@/context/ReactQueryClientProvider";
import { Sentry } from "@/services/sentry";
import { customTheme } from "@/theme/theme.config";

SplashScreen.preventAutoHideAsync().catch(console.log);

export const App = Sentry.wrap(MainApp);
function MainApp() {
  return (
    <ThemeProvider theme={customTheme}>
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <ReactQueryClientProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Text>Open up App.tsx to start working on your app!</Text>
          </GestureHandlerRootView>
        </ReactQueryClientProvider>
      </KeyboardProvider>
    </ThemeProvider>
  );
}
