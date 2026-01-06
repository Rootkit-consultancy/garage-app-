import { Link, useLocalSearchParams, router } from "expo-router";
import { useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { TitleAppBar } from "./_components/AppBar";
import { Card, TextButton } from "./_components/UI";
import { mechanics, vehicles } from "./_data/mock";
import { Colors, Radius, Shadow } from "./_theme";

type ServiceTime = "asap" | "schedule";

export default function BookingScreen() {
  const params = useLocalSearchParams<{ mechanic?: string }>();
  const mechanicId = params.mechanic ?? "sakshi";
  const mechanic = useMemo(() => mechanics.find((m) => m.id === mechanicId) ?? mechanics[0], [mechanicId]);

  const vehicle = vehicles[0];
  const [issue, setIssue] = useState("");
  const [serviceTime, setServiceTime] = useState<ServiceTime>("asap");
  const [day, setDay] = useState<"today" | "tomorrow">("today");
  const [slot, setSlot] = useState("10:00–12:00");

  return (
    <View style={styles.container}>
      <TitleAppBar title="Booking details" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Your vehicle</Text>
            <TextButton text="Change" onPress={() => {}} />
          </View>
          <View style={styles.vehicleRow}>
            <View style={styles.brandIcon}>
              <Text style={{ fontWeight: "900", color: Colors.text }}>M</Text>
            </View>
            <View>
              <Text style={styles.vehicleTitle}>{vehicle.title}</Text>
              <Text style={styles.vehicleSub}>{vehicle.subtitle}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>What’s the issue?</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe what’s happening…"
            placeholderTextColor="rgba(15,23,42,0.42)"
            value={issue}
            onChangeText={setIssue}
            multiline
          />
          <View style={styles.attachRow}>
            <View style={styles.attachLeft}>
              <Feather name="plus" size={16} color={Colors.accent} />
              <Text style={styles.attachText}>Add photos</Text>
            </View>
            <Feather name="image" size={18} color={Colors.muted} />
          </View>
        </Card>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>Service time</Text>
          <View style={styles.toggleRow}>
            <Toggle text="ASAP (Emergency)" active={serviceTime === "asap"} onPress={() => setServiceTime("asap")} />
            <Toggle text="Schedule" active={serviceTime === "schedule"} onPress={() => setServiceTime("schedule")} />
          </View>

          {serviceTime === "schedule" ? (
            <View style={{ marginTop: 12, gap: 10 }}>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <SmallPill text="Today" active={day === "today"} onPress={() => setDay("today")} />
                <SmallPill text="Tomorrow" active={day === "tomorrow"} onPress={() => setDay("tomorrow")} />
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
                {["10:00–12:00", "12:00–2:00", "2:00–4:00", "4:00–6:00"].map((s) => (
                  <SmallPill key={s} text={s} active={slot === s} onPress={() => setSlot(s)} />
                ))}
              </View>
              <Text style={styles.hint}>Selected: {day}, {slot}</Text>
            </View>
          ) : null}
        </Card>

        <Card style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>Location</Text>
            <TextButton text="Change" onPress={() => {}} />
          </View>

          <View style={styles.mapThumb} accessibilityLabel="Map thumbnail">
            <View style={styles.userDot} />
            <Text style={styles.mapLabel}>Map preview</Text>
          </View>

          <View style={styles.locRow}>
            <Feather name="map-pin" size={18} color={Colors.muted} />
            <Text style={styles.locText}>Kothrud, Pune · Near City Pride</Text>
          </View>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.sticky}>
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomLabel}>Est. range</Text>
            <Text style={styles.bottomValue}>₹350 – ₹550</Text>
          </View>
          <Link href={{ pathname: "/tracking", params: { mechanic: mechanic.id } }} asChild>
            <View style={{ flex: 1 }}>
              <View style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Confirm &amp; proceed</Text>
              </View>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
}

function Toggle({ text, active, onPress }: { text: string; active: boolean; onPress: () => void }) {
  return (
    <Text onPress={onPress} style={[styles.toggle, active ? styles.toggleActive : null]}>
      {text}
    </Text>
  );
}

function SmallPill({ text, active, onPress }: { text: string; active: boolean; onPress: () => void }) {
  return (
    <Text onPress={onPress} style={[styles.pillSm, active ? styles.pillSmActive : null]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { paddingHorizontal: 14, paddingBottom: 18, gap: 12 },
  card: { padding: 14, backgroundColor: "#fff", borderColor: Colors.border, ...Shadow.soft },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: 14, fontWeight: "900", color: Colors.text },
  vehicleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 },
  brandIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleTitle: { fontSize: 13, fontWeight: "800", color: Colors.text },
  vehicleSub: { fontSize: 11, fontWeight: "700", color: Colors.muted, marginTop: 2 },
  textArea: {
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.14)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 10,
    minHeight: 92,
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  attachRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  attachLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  attachText: { fontSize: 13, fontWeight: "800", color: "rgba(15,23,42,0.82)" },
  toggleRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  toggle: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.12)",
    backgroundColor: "#fff",
    color: "rgba(15,23,42,0.70)",
    fontWeight: "900",
    fontSize: 13,
  },
  toggleActive: {
    borderColor: "rgba(47,107,255,0.34)",
    backgroundColor: "rgba(47,107,255,0.10)",
    color: Colors.accent,
  },
  pillSm: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#fff",
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: "900",
    color: "rgba(15,23,42,0.74)",
    overflow: "hidden",
  },
  pillSmActive: {
    backgroundColor: Colors.accent,
    color: "#fff",
    borderColor: "rgba(255,255,255,0.18)",
  },
  hint: { fontSize: 11, fontWeight: "700", color: Colors.muted },
  mapThumb: {
    height: 92,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.08)",
    backgroundColor: "rgba(47,107,255,0.10)",
    marginTop: 10,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 10,
  },
  userDot: {
    position: "absolute",
    left: 14,
    top: 14,
    width: 14,
    height: 14,
    borderRadius: Radius.pill,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: Colors.accent,
  },
  mapLabel: { fontSize: 11, fontWeight: "800", color: Colors.muted, alignSelf: "flex-end" },
  locRow: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 },
  locText: { fontSize: 13, fontWeight: "800", color: Colors.text },
  sticky: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 10,
    backgroundColor: "rgba(247,248,252,0.96)",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#fff",
    ...Shadow.strong,
  },
  bottomLabel: { fontSize: 11, fontWeight: "800", color: Colors.muted },
  bottomValue: { fontSize: 14, fontWeight: "900", color: Colors.text, marginTop: 2 },
  primaryBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 14, fontWeight: "900" },
});

