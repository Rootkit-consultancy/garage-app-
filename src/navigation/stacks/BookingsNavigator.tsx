import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { BookingsStackParamList } from "../types";
import { BookingsScreen } from "../../screens/bookings/BookingsScreen";
import { BookingDetailsScreen } from "../../screens/bookings/BookingDetailsScreen";

const Stack = createNativeStackNavigator<BookingsStackParamList>();

export function BookingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookings" component={BookingsScreen} options={{ title: "Bookings" }} />
      <Stack.Screen
        name="BookingDetails"
        component={BookingDetailsScreen}
        options={{ title: "Booking details" }}
      />
    </Stack.Navigator>
  );
}

