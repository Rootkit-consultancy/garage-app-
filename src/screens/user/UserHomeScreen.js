import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import Map from '../../components/Map';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { mockMechanics } from '../../data/mock';
import { withDistanceSorted } from '../../utils/distance';
import { isWeb } from '../../utils/platform';
import { setCoords, setPermission } from '../../store/slices/locationSlice';

const filters = ['All', 'Top rated', 'Fast', 'Affordable', 'Diagnostics', 'Tyres', 'Battery'];

export default function UserHomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const rootNav = navigation.getParent?.();
  const coords = useSelector((s) => s.location.coords);
  const permission = useSelector((s) => s.location.permission);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('All');

  useEffect(() => {
    let mounted = true;
    async function run() {
      try {
        const p = await Location.requestForegroundPermissionsAsync();
        if (!mounted) return;
        dispatch(setPermission(p.status === 'granted' ? 'granted' : 'denied'));
        if (p.status !== 'granted') return;
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        if (!mounted) return;
        dispatch(setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }));
      } catch {
        dispatch(setPermission('denied'));
      }
    }
    run();
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const list = useMemo(() => {
    const base = withDistanceSorted(mockMechanics, coords, (m) => m.location);
    const q = query.trim().toLowerCase();
    return base
      .filter((m) => (selected === 'All' ? true : (m.tags || []).includes(selected)))
      .filter((m) => (q ? m.name.toLowerCase().includes(q) : true));
  }, [coords, query, selected]);

  const initialRegion = useMemo(() => {
    const fallback = { latitude: 28.6139, longitude: 77.209, latitudeDelta: 0.05, longitudeDelta: 0.05 };
    if (!coords) return fallback;
    return { ...coords, latitudeDelta: 0.05, longitudeDelta: 0.05 };
  }, [coords]);

  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Find a mechanic</Text>
        <Text style={styles.sub}>
          {permission === 'granted'
            ? 'Using your location to sort by distance'
            : permission === 'denied'
              ? 'Location denied — showing sample nearby mechanics'
              : 'Requesting location permission…'}
        </Text>
      </View>

      <Card style={styles.searchCard}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search services or garages…"
          placeholderTextColor={Colors.muted}
          style={styles.search}
        />
        <View style={styles.chips}>
          <FlatList
            data={filters}
            keyExtractor={(x) => x}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Chip label={item} selected={item === selected} onPress={() => setSelected(item)} />}
          />
        </View>
      </Card>

      <View style={styles.mapWrap}>
        <Map style={styles.map} initialRegion={initialRegion}>
          {!isWeb
            ? (() => {
                // eslint-disable-next-line global-require
                const { Marker } = require('react-native-maps');
                return (
                  <>
                    {list.map((m) => (
                      <Marker key={m.id} coordinate={m.location} title={m.name} />
                    ))}
                  </>
                );
              })()
            : null}
        </Map>
      </View>

      <Text style={styles.sectionTitle}>Nearby mechanics</Text>
      <FlatList
        data={list}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: Spacing.xl, paddingTop: Spacing.sm, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <Pressable onPress={() => (rootNav || navigation).navigate('MechanicProfile', { id: item.id })}>
            <Card style={{ marginBottom: Spacing.lg }}>
              <Text style={styles.mTitle}>{item.name}</Text>
              <Text style={styles.mSub}>
                ⭐ {item.rating} • {item.jobs} jobs • ETA {item.etaMin} min
                {item.distanceKm != null ? ` • ${item.distanceKm.toFixed(1)} km` : ''}
              </Text>

              <View style={styles.row}>
                <Button
                  title="View profile"
                  variant="outline"
                  onPress={() => (rootNav || navigation).navigate('MechanicProfile', { id: item.id })}
                  fullWidth
                />
                <View style={{ width: Spacing.md }} />
                <Button
                  title="Book"
                  onPress={() => (rootNav || navigation).navigate('ServiceDetails', { mechanicId: item.id })}
                  fullWidth
                />
              </View>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { padding: Spacing.xl, paddingBottom: Spacing.sm },
  title: { ...Typography.h2, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  searchCard: { marginHorizontal: Spacing.xl, marginBottom: Spacing.lg },
  search: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderRadius: 14,
    color: Colors.text,
    ...Typography.body,
  },
  chips: { marginTop: Spacing.md },
  mapWrap: { height: 220, paddingHorizontal: Spacing.xl, marginBottom: Spacing.lg },
  map: { borderRadius: 16, overflow: 'hidden' },
  sectionTitle: { ...Typography.h3, color: Colors.text, paddingHorizontal: Spacing.xl, marginTop: Spacing.sm },
  mTitle: { ...Typography.h3, color: Colors.text },
  mSub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs, marginBottom: Spacing.lg },
  row: { flexDirection: 'row', alignItems: 'center' },
});

