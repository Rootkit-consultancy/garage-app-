import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

// Conditionally import MapView only on native platforms
let MapView, Marker, Polyline;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  Polyline = Maps.Polyline;
}

const { width } = Dimensions.get('window');

const NavigateScreen = ({ route, navigation }) => {
  const [currentStatus, setCurrentStatus] = useState('navigating'); // navigating, reached, repairing, completed

  // Mock coordinates
  const mechanicLocation = { latitude: 28.6149, longitude: 77.2100 };
  const userLocation = { latitude: 28.6139, longitude: 77.2090 };

  const statusButtons = [
    { id: 'reached', label: 'Reached', icon: 'checkmark-circle' },
    { id: 'repairing', label: 'Started repair', icon: 'construct' },
    { id: 'completed', label: 'Completed', icon: 'checkmark-done' },
  ];

  const handleStatusUpdate = (status) => {
    // Show confirmation popup
    setCurrentStatus(status);
    if (status === 'completed') {
      navigation.navigate('JobDetails', { status: 'completed' });
    }
  };

  const handleStartNavigation = () => {
    // TODO: Deep link to Maps app
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      {Platform.OS !== 'web' && MapView ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: mechanicLocation.latitude,
            longitude: mechanicLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={mechanicLocation} title="Your Location">
            <View style={styles.mechanicMarker}>
              <Ionicons name="location" size={24} color={Colors.primary} />
            </View>
          </Marker>
          <Marker coordinate={userLocation} title="Customer Location">
            <View style={styles.userMarker}>
              <Ionicons name="person" size={24} color={Colors.white} />
            </View>
          </Marker>
          <Polyline
            coordinates={[mechanicLocation, userLocation]}
            strokeColor={Colors.primary}
            strokeWidth={3}
          />
        </MapView>
      ) : (
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={64} color={Colors.textLight} />
          <Text style={styles.mapPlaceholderText}>Map view available on mobile devices</Text>
          <View style={styles.locationInfo}>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={20} color={Colors.primary} />
              <Text style={styles.locationText}>Your Location: 28.6149°N, 77.2100°E</Text>
            </View>
            <View style={styles.locationRow}>
              <Ionicons name="person" size={20} color={Colors.primary} />
              <Text style={styles.locationText}>Customer: 28.6139°N, 77.2090°E</Text>
            </View>
          </View>
        </View>
      )}

      {/* Navigation Card */}
      <Card style={styles.navCard}>
        <View style={styles.navHeader}>
          <View>
            <Text style={styles.navTitle}>Navigate to Customer</Text>
            <Text style={styles.navDistance}>2.5 km • 15 min</Text>
          </View>
          <TouchableOpacity
            style={styles.navButton}
            onPress={handleStartNavigation}
          >
            <Ionicons name="navigate" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </Card>

      {/* Status Buttons */}
      <View style={styles.statusBar}>
        {statusButtons.map((button) => (
          <TouchableOpacity
            key={button.id}
            style={[
              styles.statusButton,
              currentStatus === button.id && styles.statusButtonActive,
            ]}
            onPress={() => handleStatusUpdate(button.id)}
          >
            <Ionicons
              name={button.icon}
              size={20}
              color={currentStatus === button.id ? Colors.white : Colors.primary}
            />
            <Text
              style={[
                styles.statusButtonText,
                currentStatus === button.id && styles.statusButtonTextActive,
              ]}
            >
              {button.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  mapPlaceholderText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  locationInfo: {
    marginTop: Spacing.xl,
    width: '100%',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  locationText: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  navCard: {
    position: 'absolute',
    top: 50,
    left: Spacing.lg,
    right: Spacing.lg,
    padding: Spacing.md,
  },
  navHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navTitle: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  navDistance: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mechanicMarker: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 4,
  },
  userMarker: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 4,
  },
  statusBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.sm,
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    gap: Spacing.xs,
  },
  statusButtonActive: {
    backgroundColor: Colors.primary,
  },
  statusButtonText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  statusButtonTextActive: {
    color: Colors.white,
  },
});

export default NavigateScreen;
