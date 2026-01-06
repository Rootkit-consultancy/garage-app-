import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const BookingSummaryScreen = ({ route, navigation }) => {
  const bookingData = route.params || {};

  const handleConfirm = () => {
    // TODO: Process booking
    navigation.replace('LiveJob', { bookingId: '123' });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.summaryCard}>
        <Text style={styles.title}>Confirm Booking</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mechanic</Text>
          <Text style={styles.sectionValue}>{bookingData.mechanic?.name || 'Rahul Auto Works'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Type</Text>
          <Text style={styles.sectionValue}>{bookingData.serviceType || 'Repair'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <Text style={styles.sectionValue}>123 Main Street, City</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time</Text>
          <Text style={styles.sectionValue}>
            {bookingData.asap ? 'ASAP' : `${bookingData.date || 'Today'} ${bookingData.time || '10:00 AM'}`}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estimated Cost</Text>
          <Text style={styles.costValue}>₹500 – ₹1,500</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.sectionValue}>UPI •••• 1234</Text>
        </View>
      </Card>

      <View style={styles.footer}>
        <Button
          title="Confirm Booking"
          onPress={handleConfirm}
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  summaryCard: {
    padding: Spacing.xl,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  sectionValue: {
    ...Typography.body,
    color: Colors.text,
  },
  costValue: {
    ...Typography.h3,
    color: Colors.primary,
  },
  footer: {
    marginTop: Spacing.xl,
  },
});

export default BookingSummaryScreen;
