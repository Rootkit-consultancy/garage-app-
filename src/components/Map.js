import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Spacing, Typography } from '../constants/theme';
import { isWeb } from '../utils/platform';

export default function Map({ style, children, initialRegion }) {
  if (isWeb) {
    return (
      <View style={[styles.web, style]}>
        <Text style={styles.webTitle}>Map preview not available on web.</Text>
        <Text style={styles.webSub}>Open on iOS/Android (Expo Go) to see the map.</Text>
      </View>
    );
  }

  // eslint-disable-next-line global-require
  const MapView = require('react-native-maps').default;
  return (
    <MapView style={[styles.map, style]} initialRegion={initialRegion} showsUserLocation>
      {children}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { width: '100%', height: '100%' },
  web: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  webTitle: { ...Typography.h3, color: Colors.text, textAlign: 'center' },
  webSub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.sm, textAlign: 'center' },
});

