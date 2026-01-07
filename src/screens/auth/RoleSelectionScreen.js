import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { setRole } from '../../store/slices/authSlice';

export default function RoleSelectionScreen() {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose your role</Text>
        <Text style={styles.sub}>You can switch later in settings.</Text>
      </View>

      <Card style={{ marginBottom: Spacing.lg }}>
        <Text style={styles.cardTitle}>Vehicle Owner</Text>
        <Text style={styles.cardSub}>Find nearby mechanics, book services, track live.</Text>
        <View style={{ marginTop: Spacing.lg }}>
          <Button title="Continue as User" onPress={() => dispatch(setRole('user'))} fullWidth />
        </View>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Mechanic</Text>
        <Text style={styles.cardSub}>Accept job requests, navigate, update status, earn.</Text>
        <View style={{ marginTop: Spacing.lg }}>
          <Button title="Continue as Mechanic" variant="outline" onPress={() => dispatch(setRole('mechanic'))} fullWidth />
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background, padding: Spacing.xl },
  header: { marginTop: Spacing.lg, marginBottom: Spacing.lg },
  title: { ...Typography.h2, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  cardTitle: { ...Typography.h3, color: Colors.text },
  cardSub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.sm, lineHeight: 20 },
});

