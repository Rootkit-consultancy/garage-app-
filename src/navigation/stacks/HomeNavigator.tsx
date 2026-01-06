import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../types";
import { HomeScreen } from "../../screens/home/HomeScreen";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Find mechanic" }}
      />
    </Stack.Navigator>
  );
}

