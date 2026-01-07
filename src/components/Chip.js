import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';

export default function Chip({ label, selected = false, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.base, selected && styles.selected]}>
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    marginRight: Spacing.sm,
  },
  selected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(37, 99, 235, 0.10)',
  },
  text: { ...Typography.sub, color: Colors.text },
  textSelected: { color: Colors.primary },
});

