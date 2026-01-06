import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors, Radius, Shadow } from "../src/theme";
import { HomeAppBar } from "../src/ui/AppBar";
import { Badge, Card, PillButton, SectionTitle, TextButton } from "../src/ui/UI";
import { mechanics, user, vehicles } from "../src/data/mock";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeAppBar address={user.address} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBar} accessibilityRole="search">
          <Feather name="search" size={18} color={Colors.muted} />
          <TextInput
            placeholder="Describe your issue or service…"
            placeholderTextColor="rgba(15,23,42,0.42)"
            style={styles.searchInput}
          />
          <Feather name="mic" size={18} color={Colors.muted} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {[
            { label: "Emergency", icon: "alert-triangle" as const },
            { label: "Puncture", icon: "disc" as const },
            { label: "Battery", icon: "zap" as const },
            { label: "Towing", icon: "truck" as const },
            { label: "Service", icon: "tool" as const },
          ].map((a) => (
            <View key={a.label} style={styles.chip}>
              <Feather name={a.icon} size={16} color={Colors.muted} />
              <Text style={styles.chipText}>{a.label}</Text>
            </View>
          ))}
        </ScrollView>

        <SectionTitle title="My vehicles" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vehicleRow}>
          {vehicles.map((v) => (
            <Card key={v.id} style={styles.vehicleCard}>
              <View style={styles.vehicleInner}>
                <View style={styles.vehicleIcon}>
                  <Feather name="truck" size={16} color={Colors.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.vehicleTitle}>{v.title}</Text>
                  <Text style={styles.vehicleSub}>{v.subtitle}</Text>
                </View>
                <TextButton text="Edit" onPress={() => {}} />
              </View>
            </Card>
          ))}
        </ScrollView>

        <View style={{ marginTop: 18 }}>
          <SectionTitle title="Nearby mechanics" />
        </View>

        <View style={{ gap: 12, marginTop: 12 }}>
          {mechanics.map((m) => (
            <Card key={m.id} style={styles.mechanicCard}>
              <View style={styles.mechanicRow}>
                <View style={styles.photo} />

                <View style={{ flex: 1 }}>
                  <Link href={`/mechanic/${m.id}`} asChild>
                    <Text style={styles.mechanicName}>{m.name}</Text>
                  </Link>
                  <View style={styles.metaRow}>
                    <Feather name="star" size={14} color={Colors.yellow} />
                    <Text style={styles.metaStrong}>{m.rating.toFixed(1)}</Text>
                    <Text style={styles.meta}>· {m.distanceKm.toFixed(1)} km · {m.etaMin} min</Text>
                  </View>
                  <View style={styles.badgeRow}>
                    {m.tags.map((t) => (
                      <Badge key={t} text={t} />
                    ))}
                  </View>
                </View>

                <View style={{ alignItems: "flex-end", gap: 8 }}>
                  <Text style={styles.price}>from ₹{m.fromPrice}</Text>
                  <Link href={{ pathname: "/booking", params: { mechanic: m.id } }} asChild>
                    <View>
                      <PillButton text="Book" variant="primary" />
                    </View>
                  </Link>
                </View>
              </View>
            </Card>
          ))}
        </View>

        <Text style={styles.tip}>Tip: open a mechanic → book → tracking → chat (demo flow).</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 24,
    gap: 14,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.06)",
    ...Shadow.soft,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  chips: {
    gap: 10,
    paddingRight: 14,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: Radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.soft,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "800",
    color: Colors.text,
  },
  vehicleRow: {
    gap: 12,
    paddingRight: 14,
  },
  vehicleCard: {
    padding: 14,
    width: 310,
    borderColor: "rgba(47,107,255,0.18)",
    backgroundColor: "rgba(47,107,255,0.10)",
  },
  vehicleInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  vehicleIcon: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(47,107,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  vehicleTitle: {
    fontSize: 14,
    fontWeight: "900",
    color: Colors.text,
  },
  vehicleSub: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.muted,
    marginTop: 2,
  },
  mechanicCard: {
    padding: 14,
    backgroundColor: Colors.card,
    borderColor: Colors.border,
  },
  mechanicRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  photo: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
  },
  mechanicName: {
    fontSize: 14,
    fontWeight: "900",
    color: Colors.text,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },
  metaStrong: {
    fontSize: 12,
    fontWeight: "900",
    color: Colors.text,
  },
  meta: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.muted,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 8,
  },
  price: {
    fontSize: 13,
    fontWeight: "800",
    color: "rgba(15,23,42,0.82)",
  },
  tip: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.muted,
    marginTop: 10,
  },
});

