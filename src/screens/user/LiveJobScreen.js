import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../constants/theme';
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

const { width, height } = Dimensions.get('window');

const statusSteps = ['Requested', 'Accepted', 'On the way', 'Repairing', 'Completed'];

const LiveJobScreen = ({ route, navigation }) => {
  const [currentStatus, setCurrentStatus] = useState(2); // On the way
  const [eta, setEta] = useState('15 min');

  // Mock coordinates
  const userLocation = { latitude: 28.6139, longitude: 77.2090 };
  const mechanicLocation = { latitude: 28.6149, longitude: 77.2100 };

  return (
    <View style={styles.container}>
      {/* Status Panel */}
      <Card style={styles.statusPanel}>
        <View style={styles.statusHeader}>
          <View style={styles.mechanicInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👨‍🔧</Text>
            </View>
            <View style={styles.mechanicDetails}>
              <Text style={styles.statusText}>Mechanic on the way</Text>
              <Text style={styles.etaText}>ETA: {eta}</Text>
            </View>
          </View>
          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="call" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Chat')}
            >
              <Ionicons name="chatbubble" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      {/* Map View */}
      <View style={styles.mapContainer}>
        {Platform.OS !== 'web' && MapView ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={userLocation} title="Your Location">
              <View style={styles.userMarker}>
                <Ionicons name="location" size={24} color={Colors.primary} />
              </View>
            </Marker>
            <Marker coordinate={mechanicLocation} title="Mechanic">
              <View style={styles.mechanicMarker}>
                <Ionicons name="car" size={24} color={Colors.white} />
              </View>
            </Marker>
            <Polyline
              coordinates={[userLocation, mechanicLocation]}
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
                <Text style={styles.locationText}>Your Location: 28.6139°N, 77.2090°E</Text>
              </View>
              <View style={styles.locationRow}>
                <Ionicons name="car" size={20} color={Colors.primary} />
                <Text style={styles.locationText}>Mechanic: 28.6149°N, 77.2100°E</Text>
              </View>
            </View>
          </View>
        )}
        <View style={styles.etaChip}>
          <Text style={styles.etaChipText}>{eta} away</Text>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />
        
        {/* Status Tracker */}
        <View style={styles.statusTracker}>
          {statusSteps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  index <= currentStatus && styles.stepCircleActive,
                ]}
              >
                {index < currentStatus && (
                  <Ionicons name="checkmark" size={16} color={Colors.white} />
                )}
              </View>
              <Text
                style={[
                  styles.stepLabel,
                  index <= currentStatus && styles.stepLabelActive,
                ]}
              >
                {step}
              </Text>
              {index < statusSteps.length - 1 && (
                <View
                  style={[
                    styles.stepLine,
                    index < currentStatus && styles.stepLineActive,
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Button
            title="Share live location"
            variant="outline"
            onPress={() => {}}
            style={styles.actionButton}
          />
          <Button
            title="Cancel job"
            variant="outline"
            onPress={() => {}}
            style={styles.actionButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  statusPanel: {
    position: 'absolute',
    top: 50,
    left: Spacing.lg,
    right: Spacing.lg,
    zIndex: 1,
    padding: Spacing.md,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mechanicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: 24,
  },
  mechanicDetails: {
    flex: 1,
  },
  statusText: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  etaText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  actionIcons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    flex: 1,
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
  userMarker: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 4,
  },
  mechanicMarker: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 4,
  },
  etaChip: {
    position: 'absolute',
    top: 20,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    ...Shadow.card,
  },
  etaChipText: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    padding: Spacing.lg,
    maxHeight: height * 0.4,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },
  statusTracker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  stepCircleActive: {
    backgroundColor: Colors.primary,
  },
  stepLabel: {
    ...Typography.small,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  stepLine: {
    position: 'absolute',
    top: 16,
    left: '60%',
    right: '-40%',
    height: 2,
    backgroundColor: Colors.border,
    zIndex: -1,
  },
  stepLineActive: {
    backgroundColor: Colors.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
});

export default LiveJobScreen;
