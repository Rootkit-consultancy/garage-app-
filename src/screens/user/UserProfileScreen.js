import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../components/Card';

const mockVehicles = [
  { id: 1, brand: 'Maruti Swift', year: '2020', plate: 'DL-01-AB-1234', isDefault: true },
  { id: 2, brand: 'Honda Activa', year: '2019', plate: 'DL-01-CD-5678', isDefault: false },
];

const mockAddresses = [
  { id: 1, type: 'Home', address: '123 Main Street, City' },
  { id: 2, type: 'Office', address: '456 Business Park, City' },
];

const UserProfileScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>👤</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.phone}>+91 9876543210</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      {/* Addresses */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Saved Addresses</Text>
        {mockAddresses.map((address) => (
          <View key={address.id} style={styles.addressItem}>
            <View style={styles.addressInfo}>
              <Text style={styles.addressType}>{address.type}</Text>
              <Text style={styles.addressText}>{address.address}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add new address</Text>
        </TouchableOpacity>
      </Card>

      {/* My Vehicles */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>My Vehicles</Text>
        {mockVehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleItem}>
            <View style={styles.vehicleIcon}>
              <Ionicons name="car" size={24} color={Colors.primary} />
            </View>
            <View style={styles.vehicleInfo}>
              <View style={styles.vehicleHeader}>
                <Text style={styles.vehicleBrand}>{vehicle.brand}</Text>
                {vehicle.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <Text style={styles.vehicleDetails}>
                {vehicle.year} • {vehicle.plate}
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={20} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add new vehicle</Text>
        </TouchableOpacity>
      </Card>

      {/* Settings */}
      <Card style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications-outline" size={24} color={Colors.textSecondary} />
          <Text style={styles.settingText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="card-outline" size={24} color={Colors.textSecondary} />
          <Text style={styles.settingText}>Payment Methods</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="language-outline" size={24} color={Colors.textSecondary} />
          <Text style={styles.settingText}>Language</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="help-circle-outline" size={24} color={Colors.textSecondary} />
          <Text style={styles.settingText}>Support & FAQs</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    backgroundColor: Colors.white,
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    fontSize: 48,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  phone: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  email: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  sectionCard: {
    margin: Spacing.lg,
    marginTop: 0,
    padding: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  addressInfo: {
    flex: 1,
  },
  addressType: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  addressText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  vehicleBrand: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginRight: Spacing.sm,
  },
  defaultBadge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  defaultText: {
    ...Typography.small,
    color: Colors.primary,
  },
  vehicleDetails: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  addButtonText: {
    ...Typography.body,
    color: Colors.primary,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
    marginLeft: Spacing.md,
  },
});

export default UserProfileScreen;
