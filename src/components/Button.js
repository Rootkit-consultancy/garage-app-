import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { BorderRadius, Colors, Spacing, Typography } from '../constants/theme';

export default function Button({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'outline'
  loading = false,
  disabled = false,
  fullWidth = false,
  left,
}) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ]}
    >
      <View style={styles.row}>
        {left ? <View style={styles.left}>{left}</View> : null}
        {loading ? (
          <ActivityIndicator color={variant === 'outline' ? Colors.primary : '#fff'} />
        ) : (
          <Text style={[styles.text, variant === 'outline' && styles.textOutline]}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  left: { marginRight: Spacing.sm },
  fullWidth: { alignSelf: 'stretch' },
  pressed: { transform: [{ scale: 0.99 }] },
  disabled: { opacity: 0.6 },
  primary: { backgroundColor: Colors.primary },
  secondary: { backgroundColor: '#101828' },
  outline: { borderWidth: 1, borderColor: Colors.primary, backgroundColor: 'transparent' },
  text: { ...Typography.body, color: '#fff' },
  textOutline: { color: Colors.primary },
});

