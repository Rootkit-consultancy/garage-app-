import { StyleSheet, Text, View } from "react-native";
import type { Mechanic, Location } from "../types/models";
import { Colors, Radius, Spacing } from "../theme";
import { distanceKm } from "../utils/distance";
import { PrimaryButton } from "./PrimaryButton";

export function MechanicCard({
  mechanic,
  userLocation,
  onBook,
}: {
  mechanic: Mechanic;
  userLocation: Location | null;
  onBook?: () => void;
}) {
  const dist = userLocation ? distanceKm(userLocation, mechanic.location) : null;

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{mechanic.name}</Text>
        <Text style={styles.meta}>
          ★ {mechanic.rating.toFixed(1)}
          {dist != null ? ` · ${dist.toFixed(1)} km` : ""} · {mechanic.etaMin} min
        </Text>
        <View style={styles.tags}>
          {mechanic.services.slice(0, 3).map((s) => (
            <View key={s} style={styles.badge}>
              <Text style={styles.badgeText}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ alignItems: "flex-end", gap: 8 }}>
        <Text style={styles.price}>
          ₹{mechanic.priceRange.min}–₹{mechanic.priceRange.max}
        </Text>
        <PrimaryButton title="Book" onPress={onBook} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    flexDirection: "row",
    gap: 12,
  },
  name: { fontSize: 14, fontWeight: "900", color: Colors.text },
  meta: { marginTop: 6, fontSize: 12, fontWeight: "700", color: Colors.muted },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 },
  badge: {
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.chip,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.06)",
  },
  badgeText: { fontSize: 11, fontWeight: "800", color: "rgba(15,23,42,0.74)" },
  price: { fontSize: 12, fontWeight: "900", color: "rgba(15,23,42,0.86)" },
});

