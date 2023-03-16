import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";

import { Routes } from "./src/routes";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";

import { theme } from "./src/config/theme";
import { AppContext } from "./src/config/app.context";
import { styles } from "./App.styles";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider value={{ setIsLoading }}>
      <RootSiblingParent>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <PaperProvider theme={theme}>
            <>
              {isLoading && (
                <ActivityIndicator
                  animating
                  hidesWhenStopped
                  size="large"
                  style={styles.loading}
                />
              )}
              <Routes style={isLoading ? styles.contentOnLoading : {}} />
              <Toast />
            </>
          </PaperProvider>
        </SafeAreaProvider>
      </RootSiblingParent>
    </AppContext.Provider>
  );
}
