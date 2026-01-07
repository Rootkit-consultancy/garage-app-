import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function JobDetailsScreen({ navigation }) {
  const [part, setPart] = useState('');
  const [cost, setCost] = useState('');
  const [parts, setParts] = useState([{ name: 'Fuse', cost: 99 }]);

  const total = useMemo(() => parts.reduce((s, p) => s + (p.cost || 0), 0), [parts]);

  return (
    <ScrollView style={styles.safe} contentContainerStyle={{ padding: Spacing.xl, paddingBottom: 120 }}>
      <Card>
        <Text style={styles.h3}>Job details</Text>
        <Text style={styles.sub}>Battery jumpstart • Customer: Shivam</Text>

        <Text style={[styles.h3, { marginTop: Spacing.lg }]}>Parts used</Text>
        {parts.map((p, i) => (
          <View key={`${p.name}-${i}`} style={styles.partRow}>
            <Text style={styles.part}>{p.name}</Text>
            <Text style={styles.part}>₹{p.cost}</Text>
          </View>
        ))}

        <View style={styles.addRow}>
          <TextInput
            value={part}
            onChangeText={setPart}
            placeholder="Part name"
            placeholderTextColor={Colors.muted}
            style={[styles.input, { flex: 1 }]}
          />
          <View style={{ width: Spacing.sm }} />
          <TextInput
            value={cost}
            onChangeText={setCost}
            placeholder="₹"
            placeholderTextColor={Colors.muted}
            keyboardType="number-pad"
            style={[styles.input, { width: 90 }]}
          />
        </View>

        <View style={{ marginTop: Spacing.sm }}>
          <Button
            title="Add part"
            variant="outline"
            onPress={() => {
              const c = Number(cost);
              if (!part.trim() || Number.isNaN(c)) return;
              setParts([...parts, { name: part.trim(), cost: c }]);
              setPart('');
              setCost('');
            }}
            fullWidth
          />
        </View>

        <View style={[styles.partRow, { marginTop: Spacing.lg }]}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>₹{total}</Text>
        </View>

        <View style={{ marginTop: Spacing.xl }}>
          <Button title="Navigate to customer" onPress={() => navigation.navigate('Navigate')} fullWidth />
          <View style={{ height: Spacing.md }} />
          <Button
            title="Open chat"
            variant="outline"
            onPress={() => navigation.navigate('ChatThread', { threadId: 't1' })}
            fullWidth
          />
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  h3: { ...Typography.h3, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  partRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.sm },
  part: { ...Typography.sub, color: Colors.subtext },
  total: { ...Typography.h3, color: Colors.text },
  addRow: { flexDirection: 'row', marginTop: Spacing.md, alignItems: 'center' },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderRadius: 14,
    color: Colors.text,
    ...Typography.sub,
  },
});

