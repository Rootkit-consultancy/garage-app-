import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const repairSteps = [
  { id: 1, label: 'Diagnosis done', completed: true },
  { id: 2, label: 'Parts arranged', completed: true },
  { id: 3, label: 'Repair started', completed: true },
  { id: 4, label: 'Testing', completed: false },
  { id: 5, label: 'Ready', completed: false },
];

const updates = [
  {
    id: 1,
    text: 'He changed brake pads',
    time: '10:30 AM',
    type: 'photo',
  },
  {
    id: 2,
    text: 'Repair in progress',
    time: '10:15 AM',
    type: 'text',
  },
];

const LiveVehicleStatusScreen = ({ navigation }) => {
  const [progress] = useState(60);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <Card style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Repair Progress</Text>
            <Text style={styles.progressPercent}>{progress}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </Card>

        {/* Repair Steps */}
        <Card style={styles.stepsCard}>
          <Text style={styles.cardTitle}>Repair Status</Text>
          {repairSteps.map((step, index) => (
            <View key={step.id} style={styles.stepRow}>
              <View
                style={[
                  styles.stepIcon,
                  step.completed && styles.stepIconCompleted,
                ]}
              >
                {step.completed ? (
                  <Ionicons name="checkmark" size={20} color={Colors.white} />
                ) : (
                  <View style={styles.stepIconPending} />
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  step.completed && styles.stepLabelCompleted,
                ]}
              >
                {step.label}
              </Text>
              {index < repairSteps.length - 1 && (
                <View
                  style={[
                    styles.stepConnector,
                    step.completed && styles.stepConnectorActive,
                  ]}
                />
              )}
            </View>
          ))}
        </Card>

        {/* Updates Timeline */}
        <Card style={styles.updatesCard}>
          <Text style={styles.cardTitle}>Updates</Text>
          {updates.map((update) => (
            <View key={update.id} style={styles.updateItem}>
              <View style={styles.updateContent}>
                <Text style={styles.updateText}>{update.text}</Text>
                {update.type === 'photo' && (
                  <View style={styles.updatePhoto}>
                    <Ionicons name="image-outline" size={32} color={Colors.textLight} />
                  </View>
                )}
                <Text style={styles.updateTime}>{update.time}</Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>

      {/* Chat Panel */}
      <View style={styles.chatPanel}>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => navigation.navigate('Chat')}
        >
          <Ionicons name="chatbubble-outline" size={20} color={Colors.primary} />
          <Text style={styles.chatButtonText}>Ask "How much time left?"</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  progressCard: {
    margin: Spacing.lg,
    padding: Spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  progressPercent: {
    ...Typography.h3,
    color: Colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  stepsCard: {
    margin: Spacing.lg,
    marginTop: 0,
    padding: Spacing.lg,
  },
  cardTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    position: 'relative',
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  stepIconCompleted: {
    backgroundColor: Colors.success,
  },
  stepIconPending: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.border,
  },
  stepLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    flex: 1,
  },
  stepLabelCompleted: {
    color: Colors.text,
    fontWeight: '600',
  },
  stepConnector: {
    position: 'absolute',
    left: 15,
    top: 32,
    width: 2,
    height: 24,
    backgroundColor: Colors.border,
  },
  stepConnectorActive: {
    backgroundColor: Colors.success,
  },
  updatesCard: {
    margin: Spacing.lg,
    marginTop: 0,
    padding: Spacing.lg,
  },
  updateItem: {
    marginBottom: Spacing.lg,
  },
  updateContent: {
    paddingLeft: Spacing.lg,
    borderLeftWidth: 2,
    borderLeftColor: Colors.primary,
  },
  updateText: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  updatePhoto: {
    width: 100,
    height: 100,
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  updateTime: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  chatPanel: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary + '15',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  chatButtonText: {
    ...Typography.body,
    color: Colors.primary,
  },
});

export default LiveVehicleStatusScreen;
