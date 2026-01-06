import { useMemo } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BookingFlowStackParamList, RootStackParamList } from "../../navigation/types";
import { Colors, Radius, Spacing } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearDraft, createBooking, selectBookingDraft } from "../../store/slices/bookingsSlice";
import { selectAuthUser } from "../../store/slices/authSlice";
import { selectMechanics } from "../../store/slices/mechanicsSlice";
import { PrimaryButton } from "../../components/PrimaryButton";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<BookingFlowStackParamList, "Summary">;

export function BookingSummaryScreen(_props: Props) {
  const dispatch = useAppDispatch();
  const draft = useAppSelector(selectBookingDraft);
  const user = useAppSelector(selectAuthUser);
  const mechanics = useAppSelector(selectMechanics);
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mechanic = useMemo(
    () => mechanics.find((m) => m.id === draft.mechanicId) ?? null,
    [draft.mechanicId, mechanics],
  );

  const canConfirm =
    !!user &&
    !!draft.mechanicId &&
    !!draft.problemType &&
    !!draft.location &&
    !!draft.addressLabel &&
    !!draft.vehicle;

  function onConfirm() {
    if (!canConfirm || !user || !draft.mechanicId || !draft.problemType || !draft.location || !draft.addressLabel || !draft.vehicle) {
      Alert.alert("Incomplete", "Please complete all booking steps.");
      return;
    }
    const bookingId = nanoid(10);
    dispatch(
      createBooking({
        id: bookingId,
        customerId: user.id,
        mechanicId: draft.mechanicId,
        problemType: draft.problemType,
        location: draft.location,
        addressLabel: draft.addressLabel,
        vehicle: draft.vehicle,
      }),
    );
    dispatch(clearDraft());
    rootNav.navigate("BookingStatus", { bookingId });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm booking</Text>
      <Text style={styles.sub}>Review details before confirming.</Text>

      <View style={styles.card}>
        <Text style={styles.head}>Mechanic</Text>
        <Text style={styles.value}>{mechanic?.name ?? "—"}</Text>

        <Text style={[styles.head, { marginTop: 12 }]}>Problem</Text>
        <Text style={styles.value}>{draft.problemType ?? "—"}</Text>

        <Text style={[styles.head, { marginTop: 12 }]}>Location</Text>
        <Text style={styles.value}>{draft.addressLabel ?? "—"}</Text>

        <Text style={[styles.head, { marginTop: 12 }]}>Vehicle</Text>
        <Text style={styles.value}>
          {draft.vehicle ? `${draft.vehicle.brand} ${draft.vehicle.model} · ${draft.vehicle.number}` : "—"}
        </Text>

        <Text style={[styles.head, { marginTop: 12 }]}>ETA & cost</Text>
        <Text style={styles.value}>
          {mechanic ? `${mechanic.etaMin} min · ₹${mechanic.priceRange.min}–₹${mechanic.priceRange.max}` : "—"}
        </Text>
      </View>

      <View style={{ marginTop: 18 }}>
        <PrimaryButton title="Confirm booking" onPress={onConfirm} disabled={!canConfirm} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.bg },
  title: { fontSize: 18, fontWeight: "900", color: Colors.text },
  sub: { marginTop: 6, fontSize: 13, fontWeight: "700", color: Colors.muted },
  card: {
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  head: { fontSize: 12, fontWeight: "900", color: Colors.muted },
  value: { marginTop: 4, fontSize: 13, fontWeight: "800", color: Colors.text },
});

