import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BookingsStackParamList, RootStackParamList } from "../../navigation/types";
import { Colors, Spacing } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectBookingById, startDraft } from "../../store/slices/bookingsSlice";
import { selectMechanics } from "../../store/slices/mechanicsSlice";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<BookingsStackParamList, "BookingDetails">;

export function BookingDetailsScreen({ route }: Props) {
  const { bookingId } = route.params;
  const booking = useAppSelector(selectBookingById(bookingId));
  const mechanics = useAppSelector(selectMechanics);
  const dispatch = useAppDispatch();
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (!booking) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Booking not found</Text>
      </View>
    );
  }

  const mech = mechanics.find((m) => m.id === booking.mechanicId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mech?.name ?? "Mechanic"}</Text>
      <Text style={styles.meta}>Status: {booking.status}</Text>
      <Text style={styles.meta}>Problem: {booking.problemType}</Text>
      <Text style={styles.meta}>Vehicle: {booking.vehicle.brand} {booking.vehicle.model} · {booking.vehicle.number}</Text>
      <Text style={styles.meta}>Location: {booking.addressLabel}</Text>
      <Text style={styles.meta}>Created: {new Date(booking.createdAt).toLocaleString()}</Text>

      <View style={{ marginTop: 18 }}>
        <PrimaryButton
          title="Rebook this mechanic"
          onPress={() => {
            dispatch(startDraft({ mechanicId: booking.mechanicId }));
            rootNav.navigate("BookingFlow", { mechanicId: booking.mechanicId });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.bg },
  title: { fontSize: 18, fontWeight: "900", color: Colors.text },
  meta: { marginTop: 10, fontSize: 13, fontWeight: "700", color: Colors.muted },
});

