import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { Colors, Radius, Spacing } from "../theme";

export function PrimaryButton({
  title,
  onPress,
  disabled,
  left,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  left?: ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        disabled ? styles.disabled : null,
        pressed && !disabled ? { transform: [{ translateY: 1 }] } : null,
      ]}
    >
      {left ?? null}
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 14,
  },
  disabled: {
    opacity: 0.55,
  },
});

