import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors, Radius, Shadow } from "../theme";

export function Card({ children, style }: { children: ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <View style={styles.sectionRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {right ?? null}
    </View>
  );
}

export function Badge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

export function PillButton({
  text,
  onPress,
  variant = "default",
}: {
  text: string;
  onPress?: () => void;
  variant?: "default" | "primary";
}) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.pill,
        isPrimary ? styles.pillPrimary : styles.pillDefault,
        pressed ? { transform: [{ translateY: 1 }] } : null,
      ]}
    >
      <Text style={[styles.pillText, isPrimary ? styles.pillTextPrimary : styles.pillTextDefault]}>
        {text}
      </Text>
    </Pressable>
  );
}

export function TextButton({
  text,
  onPress,
  color = Colors.accent,
}: {
  text: string;
  onPress?: () => void;
  color?: string;
}) {
  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.textButton, { color }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadow.soft,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: Colors.text,
  },
  badge: {
    borderRadius: Radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: Colors.chip,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.06)",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "rgba(15,23,42,0.74)",
  },
  pill: {
    borderRadius: Radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  pillDefault: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderColor: Colors.border,
  },
  pillPrimary: {
    backgroundColor: Colors.accent,
    borderColor: "rgba(255,255,255,0.18)",
  },
  pillText: {
    fontSize: 13,
    fontWeight: "900",
  },
  pillTextDefault: {
    color: Colors.text,
  },
  pillTextPrimary: {
    color: "#fff",
  },
  textButton: {
    fontSize: 12,
    fontWeight: "800",
  },
});

