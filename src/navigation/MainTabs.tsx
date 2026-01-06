import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import type { MainTabParamList } from "./types";
import { HomeNavigator } from "./stacks/HomeNavigator";
import { BookingsNavigator } from "./stacks/BookingsNavigator";
import { ChatNavigator } from "./stacks/ChatNavigator";
import { ProfileNavigator } from "./stacks/ProfileNavigator";
import { Colors } from "../theme";

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabEmoji color={color} label="🗺️" />,
        }}
      />
      <Tab.Screen
        name="BookingsTab"
        component={BookingsNavigator}
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => <TabEmoji color={color} label="📄" />,
        }}
      />
      <Tab.Screen
        name="ChatTab"
        component={ChatNavigator}
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <TabEmoji color={color} label="💬" />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabEmoji color={color} label="👤" />,
        }}
      />
    </Tab.Navigator>
  );
}

function TabEmoji({ label, color }: { label: string; color: string }) {
  // Keep it dependency-free (no vector-icons linking).
  return <Text style={{ color, fontSize: 16 }}>{label}</Text>;
}

