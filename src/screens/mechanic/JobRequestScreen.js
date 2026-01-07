import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function JobRequestScreen({ navigation }) {
  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Card>
        <Text style={styles.h3}>New job request</Text>
        <Text style={styles.sub}>Battery jumpstart • 2.1 km • ETA 12 min</Text>

        <View style={{ marginTop: Spacing.lg }}>
          <Text style={styles.line}>Customer: Shivam</Text>
          <Text style={styles.line}>Vehicle: Honda City • 2018</Text>
          <Text style={styles.line}>Address: 221B Baker Street, Downtown</Text>
          <Text style={styles.line}>Estimate: ₹699</Text>
        </View>

        <View style={{ marginTop: Spacing.xl }}>
          <Button title="Accept" onPress={() => navigation.replace('JobDetails')} fullWidth />
          <View style={{ height: Spacing.md }} />
          <Button title="Reject" variant="outline" onPress={() => navigation.goBack()} fullWidth />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  h3: { ...Typography.h3, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  line: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.sm },
});

