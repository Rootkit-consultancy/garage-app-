import { Link, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "../src/ui/UI";
import { mechanics } from "../src/data/mock";
import { Colors, Radius, Shadow } from "../src/theme";

const steps = ["Requested", "Accepted", "On the way", "Repairing", "Completed"] as const;

export default function TrackingScreen() {
  const params = useLocalSearchParams<{ mechanic?: string }>();
  const mechanicId = params.mechanic ?? "rahul";
  const mechanic = useMemo(() => mechanics.find((m) => m.id === mechanicId) ?? mechanics[0], [mechanicId]);
  const active = 2;

  return (
    <View style={styles.container}>
      <View style={styles.map} accessibilityLabel="Map">
        <View style={styles.route} />
        <View style={styles.userPin} />

        <View style={styles.mechPin}>
          <Feather name="tool" size={12} color="#fff" />
        </View>

        <View style={styles.markerChip}>
          <Text style={styles.markerChipText}>12 min</Text>
        </View>

        <View style={styles.topFloat}>
          <Card style={styles.topCard}>
            <Text style={styles.status}>MECHANIC ON THE WAY</Text>
            <Text style={styles.arriving}>Arriving in 12 min</Text>

            <View style={styles.topRow}>
              <View style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{mechanic.name}</Text>
                <Text style={styles.vehicle}>{mechanic.vehicleText}</Text>
              </View>

              <Pressable style={styles.iconBtn} accessibilityLabel="Call">
                <Feather name="phone" size={18} color={Colors.accent} />
              </Pressable>
              <Link href={{ pathname: "/chat", params: { mechanic: mechanic.id } }} asChild>
                <Pressable style={styles.iconBtn} accessibilityLabel="Chat">
                  <Feather name="message-circle" size={18} color={Colors.accent} />
                </Pressable>
              </Link>
            </View>
          </Card>
        </View>

        <View style={styles.bottomSheet} accessibilityLabel="Bottom sheet">
          <View style={styles.handle} />

          <View style={styles.stepper}>
            {steps.map((s, idx) => (
              <View key={s} style={styles.step}>
                <View style={[styles.dot, idx === active ? styles.dotActive : null]}>
                  <View style={[styles.innerDot, idx === active ? styles.innerDotActive : null]} />
                </View>
                <Text style={[styles.stepLabel, idx === active ? styles.stepLabelActive : null]} numberOfLines={1}>
                  {s}
                </Text>
              </View>
            ))}
          </View>

          <Text style={styles.sheetText}>
            <Text style={{ fontWeight: "900" }}>{mechanic.name.split(" ")[0]}</Text> is heading to you. Please keep your phone nearby.
          </Text>

          <View style={styles.sheetBtns}>
            <Pressable accessibilityLabel="Cancel booking">
              <Text style={styles.cancel}>Cancel booking</Text>
            </Pressable>
            <Pressable style={styles.outlineBtn} accessibilityLabel="Share live location">
              <Text style={styles.outlineBtnText}>Share live location</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg, padding: 14 },
  map: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.08)",
    overflow: "hidden",
    backgroundColor: "#EEF6FF",
  },
  route: {
    position: "absolute",
    left: "22%",
    top: "54%",
    width: "56%",
    height: 8,
    borderRadius: Radius.pill,
    backgroundColor: "rgba(47,107,255,0.22)",
    transform: [{ rotate: "-12deg" }],
  },
  userPin: {
    position: "absolute",
    left: "24%",
    top: "62%",
    width: 16,
    height: 16,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: Colors.accent,
    ...Shadow.soft,
  },
  mechPin: {
    position: "absolute",
    left: "72%",
    top: "48%",
    width: 18,
    height: 18,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    ...Shadow.soft,
  },
  markerChip: {
    position: "absolute",
    left: "62%",
    top: "42%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    ...Shadow.soft,
  },
  markerChipText: { fontSize: 12, fontWeight: "900", color: Colors.text },
  topFloat: { position: "absolute", left: 14, right: 14, top: 14 },
  topCard: { padding: 14, backgroundColor: "#fff", borderColor: Colors.border, ...Shadow.strong },
  status: { fontSize: 11, fontWeight: "900", color: Colors.muted, letterSpacing: 0.6 },
  arriving: { fontSize: 22, fontWeight: "900", color: Colors.text, marginTop: 6 },
  topRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
  },
  name: { fontSize: 14, fontWeight: "900", color: Colors.text },
  vehicle: { fontSize: 12, fontWeight: "700", color: Colors.muted, marginTop: 2 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
    backgroundColor: "rgba(255,255,255,0.96)",
    ...Shadow.strong,
  },
  handle: {
    width: 48,
    height: 5,
    borderRadius: Radius.pill,
    backgroundColor: "rgba(15,23,42,0.12)",
    alignSelf: "center",
    marginBottom: 10,
  },
  stepper: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  step: { alignItems: "center", flex: 1, gap: 6 },
  dot: {
    width: 28,
    height: 28,
    borderRadius: Radius.pill,
    backgroundColor: "rgba(15,23,42,0.08)",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  dotActive: { backgroundColor: "rgba(47,107,255,0.14)", borderColor: "rgba(47,107,255,0.30)" },
  innerDot: { width: 8, height: 8, borderRadius: Radius.pill, backgroundColor: "rgba(15,23,42,0.32)" },
  innerDotActive: { backgroundColor: Colors.accent },
  stepLabel: { fontSize: 10, fontWeight: "900", color: "rgba(15,23,42,0.62)", textAlign: "center" },
  stepLabelActive: { color: Colors.accent },
  sheetText: { marginTop: 12, fontSize: 13, fontWeight: "700", color: Colors.text, lineHeight: 18 },
  sheetBtns: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12, gap: 12 },
  cancel: { fontSize: 13, fontWeight: "900", color: Colors.danger },
  outlineBtn: {
    borderWidth: 1,
    borderColor: "rgba(47,107,255,0.32)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    backgroundColor: "#fff",
  },
  outlineBtnText: { fontSize: 13, fontWeight: "900", color: Colors.accent },
});

