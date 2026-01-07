import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Map from '../../components/Map';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { mockMechanics } from '../../data/mock';
import { isWeb } from '../../utils/platform';

export default function LiveJobScreen({ navigation, route }) {
  const items = useSelector((s) => s.bookings.items);
  const coords = useSelector((s) => s.location.coords);

  const booking = useMemo(() => {
    if (route.params?.bookingId === 'latest') return items[0];
    return items.find((b) => b.id === route.params?.bookingId) || items[0];
  }, [items, route.params?.bookingId]);

  const mechanic = useMemo(() => mockMechanics.find((m) => m.id === booking.mechanicId) || mockMechanics[0], [booking.mechanicId]);

  const initialRegion = useMemo(() => {
    const fallback = { latitude: 28.6139, longitude: 77.209, latitudeDelta: 0.06, longitudeDelta: 0.06 };
    if (coords) return { ...coords, latitudeDelta: 0.06, longitudeDelta: 0.06 };
    return fallback;
  }, [coords]);

  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ paddingBottom: 120 }}>
      <View style={styles.mapWrap}>
        <Map style={styles.map} initialRegion={initialRegion}>
          {!isWeb
            ? (() => {
                // eslint-disable-next-line global-require
                const { Marker } = require('react-native-maps');
                return <Marker coordinate={mechanic.location} title={mechanic.name} />;
              })()
            : null}
        </Map>
      </View>

      <View style={{ padding: Spacing.xl }}>
        <Card>
          <Text style={styles.h3}>Mechanic is on the way</Text>
          <Text style={styles.sub}>
            {mechanic.name} • ETA {booking.etaMin ?? mechanic.etaMin} min
          </Text>

          <View style={{ marginTop: Spacing.lg }}>
            {(booking.steps || []).map((s) => (
              <View key={s.key} style={styles.step}>
                <View style={[styles.dot, s.done && styles.dotDone]} />
                <Text style={[styles.stepText, s.done && styles.stepDone]}>{s.label}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginTop: Spacing.lg }}>
            <Button title="Open chat" onPress={() => navigation.navigate('ChatThread', { threadId: 't1' })} fullWidth />
            <View style={{ height: Spacing.md }} />
            <Button title="Vehicle status" variant="outline" onPress={() => navigation.navigate('LiveVehicleStatus')} fullWidth />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  mapWrap: { height: 280, padding: Spacing.xl, paddingBottom: 0 },
  map: { borderRadius: 16, overflow: 'hidden' },
  h3: { ...Typography.h3, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  step: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.sm },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.border, marginRight: Spacing.sm },
  dotDone: { backgroundColor: Colors.success },
  stepText: { ...Typography.sub, color: Colors.subtext },
  stepDone: { color: Colors.text },
});

