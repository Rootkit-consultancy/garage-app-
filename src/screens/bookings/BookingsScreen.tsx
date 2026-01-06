import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../../store/hooks";
import { selectBookings } from "../../store/slices/bookingsSlice";
import { selectMechanics } from "../../store/slices/mechanicsSlice";
import { Colors, Radius, Spacing } from "../../theme";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BookingsStackParamList, RootStackParamList } from "../../navigation/types";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<BookingsStackParamList, "Bookings">;

export function BookingsScreen(_props: Props) {
  const bookings = useAppSelector(selectBookings);
  const mechanics = useAppSelector(selectMechanics);
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: Spacing.md, gap: 12 }}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No bookings yet. Go to Home to book a mechanic.
          </Text>
        }
        renderItem={({ item }) => {
          const mech = mechanics.find((m) => m.id === item.mechanicId);
          const isActive =
            item.status === "pending" ||
            item.status === "accepted" ||
            item.status === "on_the_way";
          return (
            <View style={styles.card}>
              <Text style={styles.name}>{mech?.name ?? "Mechanic"}</Text>
              <Text style={styles.meta}>
                {new Date(item.createdAt).toLocaleString()} · {item.status} · {item.problemType}
              </Text>
              <Text style={styles.meta}>{item.addressLabel}</Text>
              <Text
                style={styles.link}
                onPress={() =>
                  isActive
                    ? rootNav.navigate("BookingStatus", { bookingId: item.id })
                    : rootNav.navigate("BookingDetails", { bookingId: item.id })
                }
              >
                View
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

