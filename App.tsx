import { StyleSheet, ActivityIndicator, View } from "react-native";
import { Routes } from "./src/routes";
import { Provider as PaperProvider } from "react-native-paper";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { RootSiblingParent } from "react-native-root-siblings";

import { theme } from "./src/config/theme";
import { AppContext } from "./src/config/app.context";
import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AppContext.Provider value={{ setIsLoading }}>
      <RootSiblingParent>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <PaperProvider theme={theme}>
            <View>{isLoading && <ActivityIndicator size="large" />}</View>
            <Routes />
          </PaperProvider>
        </SafeAreaProvider>
      </RootSiblingParent>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
