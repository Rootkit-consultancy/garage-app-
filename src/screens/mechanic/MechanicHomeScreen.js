import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function MechanicHomeScreen({ navigation }) {
  const rootNav = navigation.getParent?.();
  const [online, setOnline] = useState(true);

  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Card>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.h3}>You are {online ? 'Online' : 'Offline'}</Text>
            <Text style={styles.sub}>{online ? 'Ready for new job requests' : 'Not receiving requests'}</Text>
          </View>
          <Switch value={online} onValueChange={setOnline} />
        </View>
      </Card>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Today’s earnings</Text>
        <Text style={styles.money}>₹2,450</Text>
        <Text style={styles.sub}>3 jobs completed</Text>
      </Card>

      <Card style={{ marginTop: Spacing.lg }}>
        <Text style={styles.h3}>Incoming request</Text>
        <Text style={styles.sub}>Battery jumpstart • 2.1 km • ₹699</Text>
        <View style={{ marginTop: Spacing.lg }}>
          <Button title="View request" onPress={() => (rootNav || navigation).navigate('JobRequest')} fullWidth />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  row: { flexDirection: 'row', alignItems: 'center' },
  h3: { ...Typography.h3, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  money: { ...Typography.h1, color: Colors.text, marginTop: Spacing.sm },
});

