import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function LiveVehicleStatusScreen({ navigation }) {
  const progress = 0.4;
  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Card>
        <Text style={styles.h3}>Live repair status</Text>
        <Text style={styles.sub}>We’ll keep updating as work progresses.</Text>

        <View style={styles.barOuter}>
          <View style={[styles.barInner, { width: `${progress * 100}%` }]} />
        </View>

        <View style={{ marginTop: Spacing.lg }}>
          <Text style={styles.line}>• Diagnosis started</Text>
          <Text style={styles.line}>• Parts check in progress</Text>
          <Text style={styles.line}>• Repair pending</Text>
        </View>

        <View style={{ marginTop: Spacing.lg }}>
          <Button title="Open chat" onPress={() => navigation.navigate('ChatThread', { threadId: 't1' })} fullWidth />
        </View>
      </Card>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Timeline</Text>
        <Text style={styles.sub}>8:22 PM • Mechanic accepted your request</Text>
        <Text style={styles.sub}>8:30 PM • Mechanic en route</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  h3: { ...Typography.h3, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs, lineHeight: 20 },
  line: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.sm },
  barOuter: {
    height: 10,
    borderRadius: 6,
    backgroundColor: Colors.border,
    overflow: 'hidden',
    marginTop: Spacing.lg,
  },
  barInner: {
    height: 10,
    backgroundColor: Colors.primary,
  },
});

