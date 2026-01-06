import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
import { AuthNavigator } from "./AuthNavigator";
import { MainTabs } from "./MainTabs";
import { BookingFlowModal } from "./BookingFlowModal";
import { BookingStatusScreen } from "../screens/booking/BookingStatusScreen";
import { ChatThreadScreen } from "../screens/chat/ChatThreadScreen";
import { BookingDetailsScreen } from "../screens/bookings/BookingDetailsScreen";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAuthUser } from "../store/slices/authSlice";
import { setProfile } from "../store/slices/profileSlice";
import { useEffect } from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) dispatch(setProfile(user));
  }, [dispatch, user]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="BookingFlow"
              component={BookingFlowModal}
              options={{ presentation: "modal" }}
            />
            <Stack.Screen name="BookingStatus" component={BookingStatusScreen} />
            <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
            <Stack.Screen name="ChatThread" component={ChatThreadScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

