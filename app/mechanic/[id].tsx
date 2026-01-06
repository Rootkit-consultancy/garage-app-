import { Link, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TitleAppBar } from "../_components/AppBar";
import { Badge, Card } from "../_components/UI";
import { mechanics } from "../_data/mock";
import { Colors, Radius, Shadow } from "../_theme";

type Tab = "overview" | "reviews" | "photos";

export default function MechanicProfileScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id ?? "sakshi";
  const mechanic = useMemo(() => mechanics.find((m) => m.id === id) ?? mechanics[0], [id]);
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <View style={styles.container}>
      <TitleAppBar title="Mechanic profile" />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.headerCard}>
          <View style={styles.headerRow}>
            <View style={styles.avatarBig} />
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={styles.name}>{mechanic.name}</Text>
              <View style={styles.ratingRow}>
                <View style={styles.ratingChip}>
                  <Feather name="star" size={14} color={Colors.yellow} />
                  <Text style={styles.ratingText}>{mechanic.rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.sub}>
                  {mechanic.jobs}+ jobs · {mechanic.experienceYears} yrs experience
                </Text>
              </View>
            </View>
          </View>
        </Card>

        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Feather name="map-pin" size={18} color={Colors.muted} />
            <Text style={styles.infoText}>Within 5 km of Kothrud</Text>
          </View>
          <View style={[styles.infoRow, { marginTop: 10 }]}>
            <Feather name="clock" size={18} color={Colors.muted} />
            <Text style={styles.infoText}>Usually accepts within 2 min</Text>
          </View>
        </Card>

        <View style={styles.segmented}>
          <SegmentButton text="Overview" active={tab === "overview"} onPress={() => setTab("overview")} />
          <SegmentButton text="Reviews" active={tab === "reviews"} onPress={() => setTab("reviews")} />
          <SegmentButton text="Photos" active={tab === "photos"} onPress={() => setTab("photos")} />
        </View>

        {tab === "overview" ? (
          <View style={{ gap: 12 }}>
            <Card style={styles.block}>
              <Text style={styles.blockTitle}>Services</Text>
              <View style={styles.chipWrap}>
                {["Engine repair", "Periodic service", "Puncture", "Pickup & drop"].map((s) => (
                  <Badge key={s} text={s} />
                ))}
              </View>
            </Card>

            <Card style={styles.block}>
              <Text style={styles.blockTitle}>Vehicles</Text>
              <View style={styles.chipWrap}>
                {["Maruti", "Honda", "Bajaj", "Hero", "TVS"].map((b) => (
                  <Badge key={b} text={b} />
                ))}
              </View>
            </Card>

            <Card style={styles.block}>
              <Text style={styles.blockTitle}>About</Text>
              <Text style={styles.about}>
                Reliable doorstep assistance for cars and bikes. Transparent pricing, quick response, and genuine parts.
                We’ll diagnose first, then repair only what you approve.
              </Text>
            </Card>
          </View>
        ) : (
          <Card style={styles.block}>
            <Text style={styles.blockTitle}>{tab === "reviews" ? "Reviews" : "Photos"}</Text>
            <Text style={styles.about}>Demo screen: add real {tab} here.</Text>
          </Card>
        )}

        <View style={{ height: 90 }} />
      </ScrollView>

      <View style={styles.sticky}>
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomLabel}>Visit charge from</Text>
            <Text style={styles.bottomPrice}>₹199</Text>
          </View>
          <Link href={{ pathname: "/booking", params: { mechanic: mechanic.id } }} asChild>
            <View style={{ flex: 1 }}>
              <View style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Book this mechanic</Text>
              </View>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
}

function SegmentButton({
  text,
  active,
  onPress,
}: {
  text: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <Text
        onPress={onPress}
        style={[
          styles.segmentBtn,
          active ? styles.segmentBtnActive : null,
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { paddingHorizontal: 14, paddingBottom: 18, gap: 12 },
  headerCard: { padding: 14, ...Shadow.soft },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatarBig: {
    width: 64,
    height: 64,
    borderRadius: Radius.pill,
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
  },
  name: { fontSize: 18, fontWeight: "900", color: Colors.text },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 10, flexWrap: "wrap" },
  ratingChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fff",
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingText: { fontSize: 12, fontWeight: "900", color: Colors.text },
  sub: { fontSize: 12, fontWeight: "700", color: Colors.muted },
  infoCard: { padding: 14, backgroundColor: "#fff" },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoText: { fontSize: 13, fontWeight: "800", color: Colors.text },
  segmented: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.pill,
    padding: 4,
    gap: 4,
    marginTop: 4,
  },
  segmentBtn: {
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: Radius.pill,
    fontSize: 13,
    fontWeight: "900",
    color: "rgba(15,23,42,0.72)",
    backgroundColor: "transparent",
  },
  segmentBtnActive: {
    color: Colors.accent,
    backgroundColor: "rgba(47,107,255,0.12)",
    overflow: "hidden",
  },
  block: { padding: 14, backgroundColor: "#fff" },
  blockTitle: { fontSize: 14, fontWeight: "900", color: Colors.text },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
  about: { fontSize: 13, fontWeight: "600", color: Colors.muted, marginTop: 10, lineHeight: 18 },
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
  bottomPrice: { fontSize: 14, fontWeight: "900", color: Colors.text, marginTop: 2 },
  primaryBtn: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnText: { color: "#fff", fontSize: 14, fontWeight: "900" },
});

