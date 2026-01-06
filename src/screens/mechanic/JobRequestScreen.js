import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const JobRequestScreen = ({ route, navigation }) => {
  const { request } = route.params || {
    request: {
      distance: '2.5 km',
      earnings: 800,
      serviceType: 'Brake Repair',
      vehicleType: 'Car',
      issue: 'Brake pads need replacement',
      eta: '15 min',
      timeWindow: '10:00 AM - 11:00 AM',
    },
  };

  const handleAccept = () => {
    // TODO: Accept job logic
    navigation.navigate('Navigate', { request });
  };

  const handleReject = () => {
    // TODO: Reject job logic
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Card style={styles.modalCard}>
        <View style={styles.header}>
          <Text style={styles.title}>New Job Request</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color={Colors.primary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Distance</Text>
              <Text style={styles.infoValue}>{request.distance}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="cash" size={20} color={Colors.success} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Estimated Earnings</Text>
              <Text style={styles.infoValue}>₹{request.earnings}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="construct" size={20} color={Colors.warning} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Service Type</Text>
              <Text style={styles.infoValue}>{request.serviceType}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="car" size={20} color={Colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Vehicle Type</Text>
              <Text style={styles.infoValue}>{request.vehicleType}</Text>
            </View>
          </View>

          <View style={styles.issueSection}>
            <Text style={styles.issueLabel}>Issue Summary</Text>
            <Text style={styles.issueText}>{request.issue}</Text>
          </View>

          <View style={styles.timeSection}>
            <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.timeText}>
              ETA: {request.eta} • {request.timeWindow}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            title="Reject"
            variant="outline"
            onPress={handleReject}
            style={styles.rejectButton}
          />
          <Button
            title="Accept"
            onPress={handleAccept}
            style={styles.acceptButton}
          />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background + 'CC',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  modalCard: {
    padding: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  content: {
    marginBottom: Spacing.xl,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  infoContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  infoLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  infoValue: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  issueSection: {
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  issueLabel: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  issueText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  timeText: {
    ...Typography.body,
    color: Colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  rejectButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 1.5,
  },
});

export default JobRequestScreen;
