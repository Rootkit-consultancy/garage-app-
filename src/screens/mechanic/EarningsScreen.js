import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function EarningsScreen() {
  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Card>
        <Text style={styles.h3}>Earnings</Text>
        <Text style={styles.money}>₹18,240</Text>
        <Text style={styles.sub}>This month</Text>
      </Card>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Recent jobs</Text>
        <View style={{ marginTop: Spacing.md }}>
          <Text style={styles.line}>• Battery jumpstart — ₹699 — Completed</Text>
          <Text style={styles.line}>• Tyre puncture — ₹799 — Completed</Text>
          <Text style={styles.line}>• Diagnostics — ₹999 — Cancelled</Text>
        </View>
        <View style={{ marginTop: Spacing.lg }}>
          <Button title="Withdraw" onPress={() => {}} fullWidth />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  h3: { ...Typography.h3, color: Colors.text },
  money: { ...Typography.h1, color: Colors.text, marginTop: Spacing.sm },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  line: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.sm },
});

