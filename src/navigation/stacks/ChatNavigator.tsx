import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ChatStackParamList } from "../types";
import { ChatListScreen } from "../../screens/chat/ChatListScreen";
import { ChatThreadScreen } from "../../screens/chat/ChatThreadScreen";

const Stack = createNativeStackNavigator<ChatStackParamList>();

export function ChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: "Chat" }} />
      <Stack.Screen
        name="ChatThread"
        component={ChatThreadScreen}
        options={{ title: "Chat" }}
      />
    </Stack.Navigator>
  );
}

