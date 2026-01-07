import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { logout } from '../../store/slices/authSlice';

export default function UserProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Text style={styles.title}>{user?.name ?? 'User'}</Text>
      <Text style={styles.sub}>{user?.email ?? 'user@garage.app'}</Text>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Saved addresses</Text>
        <Text style={styles.line}>{user?.defaultAddress ?? '—'}</Text>
      </Card>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Vehicles</Text>
        {(user?.vehicles || []).map((v) => (
          <Text key={v.id} style={styles.line}>
            {v.label} • {v.plate}
          </Text>
        ))}
      </Card>

      <View style={{ marginTop: Spacing.xl }}>
        <Button title="Logout" variant="outline" onPress={() => dispatch(logout())} fullWidth />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { ...Typography.h2, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  h3: { ...Typography.h3, color: Colors.text },
  line: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.sm },
});

