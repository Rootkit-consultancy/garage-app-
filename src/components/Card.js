import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, BorderRadius, Shadow, Spacing } from '../constants/theme';

export const Card = ({ children, style, padding = true }) => {
  return (
    <View style={[styles.card, padding && styles.padding, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.lg,
    ...Shadow.card,
  },
  padding: {
    padding: Spacing.lg,
  },
});
