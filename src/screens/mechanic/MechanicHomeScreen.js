import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';

const mockIncomingRequests = [
  {
    id: 1,
    distance: '2.5 km',
    earnings: 800,
    serviceType: 'Brake Repair',
    vehicleType: 'Car',
    issue: 'Brake pads need replacement',
    eta: '15 min',
    timeWindow: '10:00 AM - 11:00 AM',
  },
];

const mockTodaysJobs = [
  { id: 1, time: '10:00 AM', location: '123 Main St', service: 'Brake Repair', status: 'accepted' },
  { id: 2, time: '2:00 PM', location: '456 Park Ave', service: 'AC Service', status: 'pending' },
];

const MechanicHomeScreen = ({ navigation }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [todayEarnings] = useState(1250);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, Rahul</Text>
          <Text style={styles.earnings}>Today: ₹{todayEarnings}</Text>
        </View>
        <TouchableOpacity
          style={[styles.onlineToggle, isOnline && styles.onlineToggleActive]}
          onPress={() => setIsOnline(!isOnline)}
        >
          <View style={[styles.toggleCircle, isOnline && styles.toggleCircleActive]} />
          <Text style={[styles.toggleText, isOnline && styles.toggleTextActive]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Incoming Requests */}
      {isOnline && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incoming Requests</Text>
          {mockIncomingRequests.map((request) => (
            <Card key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View style={styles.requestInfo}>
                  <View style={styles.requestMeta}>
                    <Ionicons name="location" size={16} color={Colors.textSecondary} />
                    <Text style={styles.requestDistance}>{request.distance}</Text>
                    <Text style={styles.requestEarnings}> • ₹{request.earnings}</Text>
                  </View>
                  <Text style={styles.requestService}>{request.serviceType}</Text>
                  <Text style={styles.requestVehicle}>{request.vehicleType}</Text>
                  <Text style={styles.requestIssue}>{request.issue}</Text>
                  <View style={styles.requestTime}>
                    <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                    <Text style={styles.requestTimeText}>
                      ETA: {request.eta} • {request.timeWindow}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.requestActions}>
                <Button
                  title="Reject"
                  variant="outline"
                  onPress={() => {}}
                  style={styles.rejectButton}
                />
                <Button
                  title="Accept"
                  onPress={() => navigation.navigate('JobRequest', { request })}
                  style={styles.acceptButton}
                />
              </View>
              <View style={styles.countdown}>
                <Text style={styles.countdownText}>⏱ 30s remaining</Text>
              </View>
            </Card>
          ))}
        </View>
      )}

      {/* Today's Jobs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Jobs</Text>
        {mockTodaysJobs.map((job) => (
          <Card key={job.id} style={styles.jobCard}>
            <View style={styles.jobHeader}>
              <View style={styles.jobTimeSlot}>
                <Ionicons name="time-outline" size={20} color={Colors.primary} />
                <Text style={styles.jobTime}>{job.time}</Text>
              </View>
              <View
                style={[
                  styles.jobStatusBadge,
                  job.status === 'accepted' && styles.jobStatusAccepted,
                ]}
              >
                <Text
                  style={[
                    styles.jobStatusText,
                    job.status === 'accepted' && styles.jobStatusTextAccepted,
                  ]}
                >
                  {job.status === 'accepted' ? 'Accepted' : 'Pending'}
                </Text>
              </View>
            </View>
            <View style={styles.jobDetails}>
              <View style={styles.jobLocation}>
                <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
                <Text style={styles.jobLocationText}>{job.location}</Text>
              </View>
              <Text style={styles.jobService}>{job.service}</Text>
            </View>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    marginBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  earnings: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  onlineToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grey,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
  },
  onlineToggleActive: {
    backgroundColor: Colors.success + '15',
  },
  toggleCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.textSecondary,
  },
  toggleCircleActive: {
    backgroundColor: Colors.success,
  },
  toggleText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  toggleTextActive: {
    color: Colors.success,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  requestCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  requestHeader: {
    marginBottom: Spacing.md,
  },
  requestInfo: {
    marginBottom: Spacing.sm,
  },
  requestMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  requestDistance: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginLeft: Spacing.xs,
  },
  requestEarnings: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  requestService: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  requestVehicle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  requestIssue: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  requestTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  requestTimeText: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  requestActions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  rejectButton: {
    flex: 1,
  },
  acceptButton: {
    flex: 1.5,
  },
  countdown: {
    marginTop: Spacing.md,
    alignItems: 'center',
  },
  countdownText: {
    ...Typography.small,
    color: Colors.warning,
  },
  jobCard: {
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  jobTimeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  jobTime: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  jobStatusBadge: {
    backgroundColor: Colors.grey,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  jobStatusAccepted: {
    backgroundColor: Colors.success + '15',
  },
  jobStatusText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  jobStatusTextAccepted: {
    color: Colors.success,
    fontWeight: '600',
  },
  jobDetails: {
    marginTop: Spacing.sm,
  },
  jobLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  jobLocationText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  jobService: {
    ...Typography.body,
    color: Colors.text,
  },
});

export default MechanicHomeScreen;
