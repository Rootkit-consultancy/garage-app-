import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "../types";
import { ProfileScreen } from "../../screens/profile/ProfileScreen";
import { ManageVehiclesScreen } from "../../screens/profile/ManageVehiclesScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen
        name="ManageVehicles"
        component={ManageVehiclesScreen}
        options={{ title: "Vehicles" }}
      />
    </Stack.Navigator>
  );
}

