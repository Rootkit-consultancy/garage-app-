import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const mockParts = [
  { id: 1, name: 'Brake Pads', qty: 2, price: 400 },
  { id: 2, name: 'Brake Fluid', qty: 1, price: 200 },
];

const JobDetailsScreen = ({ route }) => {
  const [parts, setParts] = useState(mockParts);
  const [beforePhotos, setBeforePhotos] = useState([null]);
  const [afterPhotos, setAfterPhotos] = useState([null]);

  const totalAmount = parts.reduce((sum, part) => sum + part.price * part.qty, 0);

  const handleGenerateInvoice = () => {
    // TODO: Generate invoice and mark complete
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* User Info */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Customer Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoValue}>John Doe</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>+91 9876543210</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Address:</Text>
          <Text style={styles.infoValue}>123 Main Street, City</Text>
        </View>
      </Card>

      {/* Vehicle Info */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Vehicle Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Vehicle:</Text>
          <Text style={styles.infoValue}>Maruti Swift</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Year:</Text>
          <Text style={styles.infoValue}>2020</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Plate:</Text>
          <Text style={styles.infoValue}>DL-01-AB-1234</Text>
        </View>
      </Card>

      {/* Problem Notes */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Problem Description</Text>
        <Text style={styles.problemText}>
          Brake pads need replacement. Customer reported squeaking noise and reduced braking efficiency.
        </Text>
      </Card>

      {/* Parts Used */}
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Parts Used</Text>
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        {parts.map((part) => (
          <View key={part.id} style={styles.partRow}>
            <View style={styles.partInfo}>
              <Text style={styles.partName}>{part.name}</Text>
              <Text style={styles.partDetails}>
                Qty: {part.qty} × ₹{part.price} = ₹{part.qty * part.price}
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={20} color={Colors.error} />
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>₹{totalAmount}</Text>
        </View>
      </Card>

      {/* Photos */}
      <Card style={styles.card}>
        <Text style={styles.cardTitle}>Photos</Text>
        <View style={styles.photoSection}>
          <View style={styles.photoGroup}>
            <Text style={styles.photoLabel}>Before</Text>
            <View style={styles.photoGrid}>
              {beforePhotos.map((photo, index) => (
                <TouchableOpacity key={index} style={styles.photoSlot}>
                  {photo ? (
                    <View style={styles.photoPlaceholder}>
                      <Ionicons name="image" size={32} color={Colors.primary} />
                    </View>
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <Ionicons name="camera-outline" size={32} color={Colors.textLight} />
                      <Text style={styles.photoPlaceholderText}>Add photo</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.photoGroup}>
            <Text style={styles.photoLabel}>After</Text>
            <View style={styles.photoGrid}>
              {afterPhotos.map((photo, index) => (
                <TouchableOpacity key={index} style={styles.photoSlot}>
                  {photo ? (
                    <View style={styles.photoPlaceholder}>
                      <Ionicons name="image" size={32} color={Colors.primary} />
                    </View>
                  ) : (
                    <View style={styles.photoPlaceholder}>
                      <Ionicons name="camera-outline" size={32} color={Colors.textLight} />
                      <Text style={styles.photoPlaceholderText}>Add photo</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Card>

      {/* Generate Invoice Button */}
      <View style={styles.footer}>
        <Button
          title="Generate invoice & mark complete"
          onPress={handleGenerateInvoice}
          fullWidth
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    margin: Spacing.lg,
    marginBottom: Spacing.md,
    padding: Spacing.lg,
  },
  cardTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  infoLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    width: 100,
  },
  infoValue: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  problemText: {
    ...Typography.body,
    color: Colors.text,
  },
  partRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  partInfo: {
    flex: 1,
  },
  partName: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  partDetails: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  totalAmount: {
    ...Typography.h3,
    color: Colors.primary,
  },
  photoSection: {
    gap: Spacing.lg,
  },
  photoGroup: {
    marginBottom: Spacing.md,
  },
  photoLabel: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  photoSlot: {
    width: 100,
    height: 100,
  },
  photoPlaceholder: {
    flex: 1,
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholderText: {
    ...Typography.small,
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
});

export default JobDetailsScreen;
