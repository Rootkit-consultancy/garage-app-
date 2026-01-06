import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';
import { Button } from '../../components/Button';

const mockBookings = {
  ongoing: [
    {
      id: 1,
      mechanicName: 'Rahul Auto Works',
      date: 'Today',
      time: '10:00 AM',
      service: 'Brake Repair',
      amount: 1200,
      status: 'On the way',
    },
  ],
  past: [
    {
      id: 2,
      mechanicName: 'Sharma Garage',
      date: '15 Jan 2024',
      time: '2:00 PM',
      service: 'AC Service',
      amount: 800,
      status: 'Completed',
    },
    {
      id: 3,
      mechanicName: 'Bike Doctor',
      date: '10 Jan 2024',
      time: '11:00 AM',
      service: 'Oil Change',
      amount: 500,
      status: 'Completed',
    },
  ],
};

const BookingsHistoryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const getStatusColor = (status) => {
    if (status === 'Completed') return Colors.success;
    if (status === 'On the way') return Colors.warning;
    return Colors.primary;
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'ongoing' && styles.tabActive]}
          onPress={() => setActiveTab('ongoing')}
        >
          <Text style={[styles.tabText, activeTab === 'ongoing' && styles.tabTextActive]}>
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.tabActive]}
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {mockBookings[activeTab].map((booking) => (
          <Card
            key={booking.id}
            style={styles.bookingCard}
            onPress={() => {
              // TODO: Navigate to booking details
            }}
          >
            <View style={styles.bookingHeader}>
              <View style={styles.bookingInfo}>
                <Text style={styles.mechanicName}>{booking.mechanicName}</Text>
                <View style={styles.bookingMeta}>
                  <Text style={styles.bookingDate}>
                    {booking.date} • {booking.time}
                  </Text>
                </View>
                <Text style={styles.serviceLabel}>{booking.service}</Text>
              </View>
              <View style={styles.bookingRight}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(booking.status) + '15' },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(booking.status) },
                    ]}
                  >
                    {booking.status}
                  </Text>
                </View>
                <Text style={styles.amount}>₹{booking.amount}</Text>
              </View>
            </View>
            {activeTab === 'past' && (
              <View style={styles.bookingActions}>
                <Button
                  title="Re-book mechanic"
                  variant="outline"
                  size="small"
                  onPress={() => {}}
                  style={styles.actionButton}
                />
                <Button
                  title="Rate & tip"
                  size="small"
                  onPress={() => {}}
                  style={styles.actionButton}
                />
              </View>
            )}
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  bookingCard: {
    margin: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookingInfo: {
    flex: 1,
  },
  mechanicName: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  bookingMeta: {
    marginBottom: Spacing.xs,
  },
  bookingDate: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  serviceLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  bookingRight: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },
  statusText: {
    ...Typography.small,
    fontWeight: '600',
  },
  amount: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  bookingActions: {
    flexDirection: 'row',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
});

export default BookingsHistoryScreen;
