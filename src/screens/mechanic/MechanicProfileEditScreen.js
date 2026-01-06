import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Card } from '../../components/Card';

const MechanicProfileEditScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>Edit Profile</Text>
        <Text style={styles.note}>Profile editing functionality coming soon</Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    margin: Spacing.lg,
    padding: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  note: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
});

export default MechanicProfileEditScreen;
