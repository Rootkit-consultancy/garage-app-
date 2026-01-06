import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, BorderRadius, Typography, Spacing } from '../constants/theme';

export const Chip = ({ 
  label, 
  onPress, 
  selected = false, 
  variant = 'default',
  style,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && styles.selected,
        variant === 'primary' && selected && styles.primarySelected,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
          variant === 'primary' && selected && styles.primarySelectedText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.grey,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selected: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  primarySelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  text: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  selectedText: {
    color: Colors.primary,
  },
  primarySelectedText: {
    color: Colors.white,
  },
});
