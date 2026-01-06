import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./src/store/store";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar barStyle="dark-content" />
          <RootNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
