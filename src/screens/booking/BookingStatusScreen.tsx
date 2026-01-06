import { useEffect, useMemo, useState } from "react";
import { Alert, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/types";
import { Colors, Radius, Spacing } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectBookingById, setBookingStatus } from "../../store/slices/bookingsSlice";
import { selectMechanics } from "../../store/slices/mechanicsSlice";
import type { Location } from "../../types/models";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "BookingStatus">;

export function BookingStatusScreen({ route }: Props) {
  const { bookingId } = route.params;
  const booking = useAppSelector(selectBookingById(bookingId));
  const mechanics = useAppSelector(selectMechanics);
  const dispatch = useAppDispatch();
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mechanic = useMemo(() => {
    if (!booking) return null;
    return mechanics.find((m) => m.id === booking.mechanicId) ?? null;
  }, [booking, mechanics]);

  const userLoc = useMemo<Location>(
    () => booking?.location ?? { latitude: 18.5074, longitude: 73.8077 },
    [booking?.location],
  );
  const [mechLoc, setMechLoc] = useState<Location | null>(mechanic?.location ?? null);

  // Simulate status progression.
  useEffect(() => {
    if (!booking) return;
    if (booking.status === "cancelled" || booking.status === "completed") return;

    if (booking.status === "pending") {
      const t = setTimeout(() => dispatch(setBookingStatus({ id: booking.id, status: "accepted" })), 2500);
      return () => clearTimeout(t);
    }
    if (booking.status === "accepted") {
      const t = setTimeout(() => dispatch(setBookingStatus({ id: booking.id, status: "on_the_way" })), 2500);
      return () => clearTimeout(t);
    }
    return;
  }, [booking, dispatch]);

  // Simulate mechanic moving towards user.
  useEffect(() => {
    if (!booking || booking.status !== "on_the_way") return;
    if (!mechanic) return;
    if (!mechLoc) setMechLoc(mechanic.location);

    const interval = setInterval(() => {
      setMechLoc((prev) => {
        const cur = prev ?? mechanic.location;
        const next = moveToward(cur, userLoc, 0.08);
        const arrived = distanceApproxMeters(next, userLoc) < 40;
        if (arrived) {
          dispatch(setBookingStatus({ id: booking.id, status: "completed" }));
          return userLoc;
        }
        return next;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [booking, dispatch, mechanic, mechLoc, userLoc]);

  if (!booking || !mechanic) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Booking not found</Text>
      </View>
    );
  }

  const statusLabel =
    booking.status === "pending"
      ? "REQUESTED"
      : booking.status === "accepted"
        ? "ACCEPTED"
        : booking.status === "on_the_way"
          ? "MECHANIC ON THE WAY"
          : booking.status.toUpperCase();

  const etaText =
    booking.status === "on_the_way" ? `${mechanic.etaMin} min` : booking.status === "accepted" ? "Starting soon" : "Awaiting";

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation={false}
      >
        <Marker coordinate={userLoc} title="You" pinColor={Colors.primary} />
        {mechLoc ? <Marker coordinate={mechLoc} title={mechanic.name} /> : null}
        {mechLoc ? (
          <Polyline
            coordinates={[mechLoc, userLoc]}
            strokeColor="rgba(47,107,255,0.35)"
            strokeWidth={5}
          />
        ) : null}
      </MapView>

      <View style={styles.topCard}>
        <Text style={styles.status}>{statusLabel}</Text>
        <Text style={styles.arriving}>ETA: {etaText}</Text>

        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{mechanic.name}</Text>
            <Text style={styles.meta}>
              Problem: {booking.problemType} · {booking.vehicle.brand} {booking.vehicle.model}
            </Text>
          </View>
          <Pressable
            style={styles.smallBtn}
            onPress={() => Linking.openURL(`tel:${mechanic.phone}`).catch(() => {})}
          >
            <Text style={styles.smallBtnText}>Call</Text>
          </Pressable>
          <Pressable
            style={styles.smallBtn}
            onPress={() => rootNav.navigate("ChatThread", { bookingId })}
          >
            <Text style={styles.smallBtnText}>Chat</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.bottomSheet}>
        <Text style={styles.sheetText}>
          {booking.status === "on_the_way"
            ? `${mechanic.name.split(" ")[0]} is heading to you. Keep your phone nearby.`
            : booking.status === "accepted"
              ? "Mechanic accepted. Preparing to start."
              : booking.status === "pending"
                ? "Waiting for mechanic to accept."
                : `Booking ${booking.status}.`}
        </Text>

        {booking.status === "pending" || booking.status === "accepted" || booking.status === "on_the_way" ? (
          <View style={{ marginTop: 12 }}>
            <PrimaryButton
              title="Cancel booking"
              onPress={() => {
                Alert.alert("Cancel booking?", "This will mark the booking as cancelled.", [
                  { text: "No", style: "cancel" },
                  {
                    text: "Yes, cancel",
                    style: "destructive",
                    onPress: () => dispatch(setBookingStatus({ id: booking.id, status: "cancelled" })),
                  },
                ]);
              }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

function moveToward(from: Location, to: Location, step: number): Location {
  return {
    latitude: from.latitude + (to.latitude - from.latitude) * step,
    longitude: from.longitude + (to.longitude - from.longitude) * step,
  };
}

function distanceApproxMeters(a: Location, b: Location) {
  // quick approximation good enough for demo
  const dx = (a.longitude - b.longitude) * 111_320 * Math.cos(((a.latitude + b.latitude) / 2) * (Math.PI / 180));
  const dy = (a.latitude - b.latitude) * 110_540;
  return Math.sqrt(dx * dx + dy * dy);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  title: { padding: Spacing.lg, fontSize: 18, fontWeight: "900", color: Colors.text },
  topCard: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  status: { fontSize: 11, fontWeight: "900", color: Colors.muted, letterSpacing: 0.6 },
  arriving: { marginTop: 6, fontSize: 18, fontWeight: "900", color: Colors.text },
  row: { marginTop: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  name: { fontSize: 14, fontWeight: "900", color: Colors.text },
  meta: { marginTop: 4, fontSize: 12, fontWeight: "700", color: Colors.muted },
  smallBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#fff",
  },
  smallBtnText: { fontSize: 12, fontWeight: "900", color: Colors.primary },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: Spacing.lg,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
  },
  sheetText: { fontSize: 13, fontWeight: "700", color: Colors.text, lineHeight: 18 },
});

