import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { mockMechanics } from '../../data/mock';

export default function BookingsHistoryScreen({ navigation }) {
  const rootNav = navigation.getParent?.();
  const items = useSelector((s) => s.bookings.items);

  const { ongoing, past } = useMemo(() => {
    const on = items.filter((b) => b.status === 'ongoing');
    const pa = items.filter((b) => b.status !== 'ongoing');
    return { ongoing: on, past: pa };
  }, [items]);

  const renderBooking = (b, kind) => {
    const mech = mockMechanics.find((m) => m.id === b.mechanicId) || mockMechanics[0];
    return (
      <Card style={{ marginBottom: Spacing.lg }}>
        <Text style={styles.title}>{b.service}</Text>
        <Text style={styles.sub}>
          {mech.name} • {kind === 'ongoing' ? 'In progress' : 'Completed'} • {b.address}
        </Text>
        <View style={{ marginTop: Spacing.lg }}>
          {kind === 'ongoing' ? (
            <Button
              title="Track live"
              onPress={() => (rootNav || navigation).navigate('LiveJob', { bookingId: b.id })}
              fullWidth
            />
          ) : (
            <Button title="Book again" variant="outline" onPress={() => navigation.navigate('Home')} fullWidth />
          )}
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.safe}>
      <FlatList
        data={[{ k: 'ongoing', data: ongoing }, { k: 'past', data: past }]}
        keyExtractor={(x) => x.k}
        contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: Spacing.lg }}>
            <Text style={styles.section}>{item.k === 'ongoing' ? 'Ongoing' : 'Past'}</Text>
            {item.data.length === 0 ? (
              <Text style={styles.empty}>No {item.k} bookings yet.</Text>
            ) : (
              item.data.map((b) => <View key={b.id}>{renderBooking(b, item.k)}</View>)
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  section: { ...Typography.h3, color: Colors.text, marginBottom: Spacing.md },
  empty: { ...Typography.sub, color: Colors.subtext, marginBottom: Spacing.lg },
  title: { ...Typography.h3, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs, lineHeight: 20 },
});

