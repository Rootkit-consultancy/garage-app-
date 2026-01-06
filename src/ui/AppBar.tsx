import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Colors, Radius } from "../theme";

export function HomeAppBar({ address }: { address: string }) {
  return (
    <View style={styles.bar}>
      <View style={styles.rowBetween}>
        <View style={styles.logoBtn} accessibilityLabel="Logo">
          <Feather name="tool" size={18} color={Colors.accent} />
        </View>

        <View style={styles.center}>
          <Text style={styles.locationLabel}>Your location</Text>
          <View style={styles.centerRow}>
            <Feather name="map-pin" size={14} color={Colors.muted} />
            <Text style={styles.address}>{address}</Text>
            <Feather name="chevron-down" size={16} color={Colors.muted} />
          </View>
        </View>

        <View style={styles.avatar} accessibilityLabel="User avatar" />
      </View>
    </View>
  );
}

export function TitleAppBar({
  title,
  onBack,
  right,
}: {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.bar}>
      <View style={styles.rowBetween}>
        <Pressable
          onPress={onBack ?? (() => router.back())}
          style={styles.iconBtn}
          accessibilityLabel="Back"
        >
          <Feather name="chevron-left" size={20} color={Colors.text} />
        </Pressable>

        <Text style={styles.title}>{title}</Text>

        <View style={styles.rightSlot}>{right ?? null}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 14,
    backgroundColor: Colors.bg,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  logoBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
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
  center: {
    flex: 1,
    alignItems: "center",
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.muted,
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  address: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.10)",
  },
  title: {
    fontSize: 15,
    fontWeight: "900",
    color: Colors.text,
  },
  rightSlot: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});

