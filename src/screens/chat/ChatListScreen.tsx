import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { selectBookings } from "../../store/slices/bookingsSlice";
import { selectMechanics } from "../../store/slices/mechanicsSlice";
import { Colors, Radius, Spacing } from "../../theme";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ChatStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<ChatStackParamList, "ChatList">;

export function ChatListScreen({ navigation }: Props) {
  const bookings = useAppSelector(selectBookings);
  const mechanics = useAppSelector(selectMechanics);

  const active = bookings.filter(
    (b) => b.status === "pending" || b.status === "accepted" || b.status === "on_the_way",
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={active}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: Spacing.md, gap: 12 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No active chats. Start a booking to chat.</Text>
        }
        renderItem={({ item }) => {
          const mech = mechanics.find((m) => m.id === item.mechanicId);
          return (
            <View style={styles.card}>
              <Text style={styles.name}>{mech?.name ?? "Mechanic"}</Text>
              <Text style={styles.meta}>{item.problemType} · {item.status}</Text>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("ChatThread", { bookingId: item.id })}
              >
                Open chat
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: Spacing.md,
  },
  name: { fontSize: 14, fontWeight: "900", color: Colors.text },
  meta: { marginTop: 6, fontSize: 12, fontWeight: "700", color: Colors.muted },
  link: { marginTop: 10, fontSize: 12, fontWeight: "900", color: Colors.primary },
  empty: { padding: Spacing.lg, color: Colors.muted, fontWeight: "700" },
});

