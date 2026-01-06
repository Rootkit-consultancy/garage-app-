import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Typography } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="construct" size={80} color={Colors.primary} />
      <Text style={styles.title}>Garage App</Text>
      <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.h1,
    color: Colors.primary,
    marginTop: 24,
  },
  loader: {
    marginTop: 32,
  },
});

export default SplashScreen;
