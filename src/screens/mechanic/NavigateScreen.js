import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Map from '../../components/Map';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { isWeb } from '../../utils/platform';

export default function NavigateScreen() {
  const coords = useSelector((s) => s.location.coords);

  const customer = useMemo(() => ({ latitude: 28.6139, longitude: 77.209 }), []);
  const initialRegion = useMemo(() => {
    const base = coords || customer;
    return { ...base, latitudeDelta: 0.06, longitudeDelta: 0.06 };
  }, [coords, customer]);

  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ paddingBottom: 120 }}>
      <View style={styles.mapWrap}>
        <Map style={styles.map} initialRegion={initialRegion}>
          {!isWeb
            ? (() => {
                // eslint-disable-next-line global-require
                const { Marker } = require('react-native-maps');
                return (
                  <>
                    {coords ? <Marker coordinate={coords} title="You" pinColor={Colors.primary} /> : null}
                    <Marker coordinate={customer} title="Customer" />
                  </>
                );
              })()
            : null}
        </Map>
      </View>

      <View style={{ padding: Spacing.xl }}>
        <Card>
          <Text style={styles.h3}>Navigate</Text>
          <Text style={styles.sub}>Customer: 221B Baker Street, Downtown</Text>

          <View style={{ marginTop: Spacing.lg }}>
            <Button title="Reached" onPress={() => {}} fullWidth />
            <View style={{ height: Spacing.md }} />
            <Button title="Started repair" variant="outline" onPress={() => {}} fullWidth />
            <View style={{ height: Spacing.md }} />
            <Button title="Completed" variant="outline" onPress={() => {}} fullWidth />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  mapWrap: { height: 320, padding: Spacing.xl, paddingBottom: 0 },
  map: { borderRadius: 16, overflow: 'hidden' },
  h3: { ...Typography.h3, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
});

