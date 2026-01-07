import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function MechanicProfileEditScreen() {
  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Card>
        <Text style={styles.h3}>Profile</Text>
        <Text style={styles.sub}>Edit mechanic profile (placeholder).</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  h3: { ...Typography.h3, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
});

