import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Chip } from '../../components/Chip';

const quickFilters = ['Puncture', 'Battery', 'Towing', 'Bike Service', 'Car Service'];

const mockMechanics = [
  {
    id: 1,
    name: 'Rahul Auto Works',
    rating: 4.8,
    distance: '2.5 km',
    vehicleTypes: ['Car', 'Bike'],
    priceFrom: 300,
    avatar: '👨‍🔧',
  },
  {
    id: 2,
    name: 'Sharma Garage',
    rating: 4.6,
    distance: '3.2 km',
    vehicleTypes: ['Car'],
    priceFrom: 500,
    avatar: '👨‍🔧',
  },
  {
    id: 3,
    name: 'Bike Doctor',
    rating: 4.9,
    distance: '1.8 km',
    vehicleTypes: ['Bike'],
    priceFrom: 200,
    avatar: '👨‍🔧',
  },
];

const UserHomeScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={20} color={Colors.primary} />
            <Text style={styles.locationText}>Current Location</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Describe the issue or service..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity>
            <Ionicons name="mic" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Quick Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {quickFilters.map((filter) => (
            <Chip
              key={filter}
              label={filter}
              selected={selectedFilter === filter}
              onPress={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
              style={styles.filterChip}
            />
          ))}
        </ScrollView>

        {/* Nearby Mechanics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Mechanics</Text>
          {mockMechanics.map((mechanic) => (
            <Card key={mechanic.id} style={styles.mechanicCard}>
              <View style={styles.mechanicHeader}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatar}>{mechanic.avatar}</Text>
                </View>
                <View style={styles.mechanicInfo}>
                  <Text style={styles.mechanicName}>{mechanic.name}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color={Colors.warning} />
                    <Text style={styles.rating}>{mechanic.rating}</Text>
                    <Text style={styles.distance}> • {mechanic.distance}</Text>
                  </View>
                  <View style={styles.badgesContainer}>
                    {mechanic.vehicleTypes.map((type) => (
                      <View key={type} style={styles.badge}>
                        <Text style={styles.badgeText}>{type}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.priceFrom}>From</Text>
                  <Text style={styles.price}>₹{mechanic.priceFrom}</Text>
                </View>
              </View>
              <View style={styles.mechanicActions}>
                <Button
                  title="View Profile"
                  variant="outline"
                  size="medium"
                  onPress={() => navigation.navigate('MechanicProfile', { mechanic })}
                  style={styles.actionButton}
                />
                <Button
                  title="Book"
                  size="medium"
                  onPress={() => navigation.navigate('ServiceDetails', { mechanic })}
                  style={[styles.actionButton, styles.primaryButton]}
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginLeft: Spacing.xs,
    marginRight: Spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    paddingVertical: Spacing.md,
  },
  filtersContainer: {
    marginBottom: Spacing.lg,
  },
  filtersContent: {
    paddingHorizontal: Spacing.lg,
  },
  filterChip: {
    marginRight: Spacing.sm,
  },
  section: {
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  mechanicCard: {
    marginBottom: Spacing.lg,
    padding: Spacing.lg,
  },
  mechanicHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatar: {
    fontSize: 32,
  },
  mechanicInfo: {
    flex: 1,
  },
  mechanicName: {
    ...Typography.bodyBold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  rating: {
    ...Typography.caption,
    color: Colors.text,
    marginLeft: Spacing.xs,
  },
  distance: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  badgesContainer: {
    flexDirection: 'row',
    marginTop: Spacing.xs,
  },
  badge: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.xs,
  },
  badgeText: {
    ...Typography.small,
    color: Colors.primary,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceFrom: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
  price: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  mechanicActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  primaryButton: {
    flex: 1.5,
  },
});

export default UserHomeScreen;
