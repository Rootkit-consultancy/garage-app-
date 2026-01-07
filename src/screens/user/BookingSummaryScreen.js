import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { mockMechanics, mockUser } from '../../data/mock';
import { createBooking } from '../../store/slices/bookingSlice';

export default function BookingSummaryScreen({ navigation }) {
  const dispatch = useDispatch();
  const draft = useSelector((s) => s.bookings.draft);

  const mechanic = useMemo(() => mockMechanics.find((m) => m.id === draft.mechanicId) || mockMechanics[0], [draft.mechanicId]);
  const vehicle = useMemo(() => mockUser.vehicles.find((v) => v.id === draft.vehicleId) || mockUser.vehicles[0], [draft.vehicleId]);

  const onConfirm = () => {
    dispatch(
      createBooking({
        mechanicId: mechanic.id,
        service: draft.service,
        address: draft.address,
        etaMin: mechanic.etaMin,
        steps: [
          { key: 'accepted', label: 'Accepted', done: true },
          { key: 'enroute', label: 'En route', done: false },
          { key: 'reached', label: 'Reached', done: false },
          { key: 'repair', label: 'Repair in progress', done: false },
          { key: 'done', label: 'Completed', done: false },
        ],
      })
    );
    navigation.navigate('LiveJob', { bookingId: 'latest' });
  };

  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Card>
        <Text style={styles.h3}>Booking summary</Text>
        <Text style={styles.line}>Mechanic: {mechanic.name}</Text>
        <Text style={styles.line}>Service: {draft.service}</Text>
        <Text style={styles.line}>Vehicle: {vehicle.label}</Text>
        <Text style={styles.line}>Address: {draft.address}</Text>
        <Text style={styles.line}>ETA: {mechanic.etaMin} min</Text>
        <Text style={styles.line}>Payment: {draft.payment}</Text>
      </Card>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Estimated cost</Text>
        <View style={styles.priceRow}>
          <Text style={styles.line}>Service</Text>
          <Text style={styles.price}>₹699</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.line}>Convenience fee</Text>
          <Text style={styles.price}>₹49</Text>
        </View>
        <View style={[styles.priceRow, { marginTop: Spacing.sm }]}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>₹748</Text>
        </View>
      </Card>

      <View style={{ marginTop: Spacing.xl }}>
        <Button title="Confirm booking" onPress={onConfirm} fullWidth />
        <View style={{ height: Spacing.md }} />
        <Button title="Edit details" variant="outline" onPress={() => navigation.goBack()} fullWidth />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  h3: { ...Typography.h3, color: Colors.text, marginBottom: Spacing.sm },
  line: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.xs },
  price: { ...Typography.sub, color: Colors.text },
  total: { ...Typography.h3, color: Colors.text },
});

