import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { mockUser } from '../../data/mock';
import { setDraft } from '../../store/slices/bookingSlice';

const services = ['Battery jumpstart', 'Tyre puncture', 'Diagnostics', 'Oil change', 'AC repair'];

export default function ServiceDetailsScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const draft = useSelector((s) => s.bookings.draft);
  const [service, setService] = useState(draft.service || services[0]);
  const [vehicleId, setVehicleId] = useState(draft.vehicleId || mockUser.vehicles[0].id);
  const [note, setNote] = useState(draft.note || '');
  const [address, setAddress] = useState(draft.address || mockUser.defaultAddress);

  const vehicleLabel = useMemo(() => mockUser.vehicles.find((v) => v.id === vehicleId)?.label, [vehicleId]);

  const onContinue = () => {
    dispatch(
      setDraft({
        mechanicId: route.params?.mechanicId ?? draft.mechanicId,
        service,
        vehicleId,
        note,
        address,
      })
    );
    navigation.navigate('BookingSummary');
  };

  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Card>
        <Text style={styles.h3}>Vehicle</Text>
        <View style={styles.rowWrap}>
          {mockUser.vehicles.map((v) => (
            <Chip key={v.id} label={v.label} selected={v.id === vehicleId} onPress={() => setVehicleId(v.id)} />
          ))}
        </View>

        <Text style={[styles.h3, { marginTop: Spacing.lg }]}>Service</Text>
        <View style={styles.rowWrap}>
          {services.map((s) => (
            <Chip key={s} label={s} selected={s === service} onPress={() => setService(s)} />
          ))}
        </View>

        <Text style={[styles.h3, { marginTop: Spacing.lg }]}>Problem details</Text>
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Tell us what happened (optional)…"
          placeholderTextColor={Colors.muted}
          style={[styles.input, { height: 96 }]}
          multiline
        />

        <Text style={[styles.h3, { marginTop: Spacing.lg }]}>Address</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Service address"
          placeholderTextColor={Colors.muted}
          style={styles.input}
        />
      </Card>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <Text style={styles.summaryLine}>Vehicle: {vehicleLabel}</Text>
        <Text style={styles.summaryLine}>Service: {service}</Text>
        <Text style={styles.summaryLine}>Address: {address}</Text>
      </Card>

      <View style={{ marginTop: Spacing.xl }}>
        <Button title="Continue" onPress={onContinue} fullWidth />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  h3: { ...Typography.h3, color: Colors.text },
  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', marginTop: Spacing.md },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderRadius: 14,
    color: Colors.text,
    ...Typography.body,
    marginTop: Spacing.md,
  },
  summaryTitle: { ...Typography.h3, color: Colors.text, marginBottom: Spacing.sm },
  summaryLine: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
});

