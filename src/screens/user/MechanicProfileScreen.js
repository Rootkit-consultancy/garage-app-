import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { mockMechanicProfile, mockMechanics } from '../../data/mock';
import { setDraft } from '../../store/slices/bookingSlice';

export default function MechanicProfileScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { id } = route.params || {};
  const coords = useSelector((s) => s.location.coords);

  const m = useMemo(() => mockMechanics.find((x) => x.id === id) || mockMechanicProfile, [id]);

  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Text style={styles.title}>{m.name}</Text>
      <Text style={styles.sub}>
        ⭐ {m.rating} • {m.reviews ?? m.jobs ?? 0} reviews/jobs • {m.experienceYears ?? 5}+ years
      </Text>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Highlights</Text>
        <Text style={styles.body}>Verified professional with transparent pricing and live updates.</Text>
        <Text style={[styles.h3, { marginTop: Spacing.lg }]}>Skills</Text>
        <Text style={styles.body}>{(m.skills || ['Diagnostics', 'Tyres', 'Battery']).join(' • ')}</Text>
        <Text style={[styles.h3, { marginTop: Spacing.lg }]}>Vehicle brands</Text>
        <Text style={styles.body}>{(m.brands || ['Honda', 'Hyundai']).join(' • ')}</Text>
        <Text style={[styles.h3, { marginTop: Spacing.lg }]}>Languages</Text>
        <Text style={styles.body}>{(m.languages || ['English']).join(' • ')}</Text>
      </Card>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Reviews</Text>
        <Text style={styles.body}>“Quick service and friendly.” — Ayesha</Text>
        <Text style={[styles.body, { marginTop: Spacing.sm }]}>“Solved the issue in 20 minutes.” — Rahul</Text>
      </Card>

      <View style={{ marginTop: Spacing.xl }}>
        <Button
          title="Book this mechanic"
          onPress={() => {
            dispatch(setDraft({ mechanicId: id }));
            navigation.navigate('ServiceDetails', { mechanicId: id, fromProfile: true });
          }}
          fullWidth
        />
        {coords ? (
          <Text style={[styles.hint, { marginTop: Spacing.sm }]}>Distance is computed on Home screen.</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { ...Typography.h2, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  h3: { ...Typography.h3, color: Colors.text },
  body: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.sm, lineHeight: 20 },
  hint: { ...Typography.cap, color: Colors.muted },
});

