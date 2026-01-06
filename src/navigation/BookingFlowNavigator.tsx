import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { BookingFlowStackParamList } from "./types";
import { ProblemTypeScreen } from "../screens/booking/ProblemTypeScreen";
import { ConfirmLocationScreen } from "../screens/booking/ConfirmLocationScreen";
import { VehicleDetailsScreen } from "../screens/booking/VehicleDetailsScreen";
import { BookingSummaryScreen } from "../screens/booking/BookingSummaryScreen";

const Stack = createNativeStackNavigator<BookingFlowStackParamList>();

export function BookingFlowNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProblemType" component={ProblemTypeScreen} options={{ title: "Problem" }} />
      <Stack.Screen
        name="ConfirmLocation"
        component={ConfirmLocationScreen}
        options={{ title: "Location" }}
      />
      <Stack.Screen
        name="VehicleDetails"
        component={VehicleDetailsScreen}
        options={{ title: "Vehicle" }}
      />
      <Stack.Screen name="Summary" component={BookingSummaryScreen} options={{ title: "Summary" }} />
    </Stack.Navigator>
  );
}

