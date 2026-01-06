import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const RoleSelectionScreen = ({ navigation }) => {
  const handleRoleSelect = (role) => {
    // TODO: Save role preference
    if (role === 'user') {
      navigation.replace('UserTabs');
    } else {
      navigation.replace('MechanicTabs');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Choose your role</Text>
        <Text style={styles.subtitle}>Select how you want to use the app</Text>

        <View style={styles.rolesContainer}>
          <Card style={styles.roleCard}>
            <TouchableOpacity
              style={styles.roleButton}
              onPress={() => handleRoleSelect('user')}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="car" size={48} color={Colors.primary} />
              </View>
              <Text style={styles.roleTitle}>I am a Vehicle Owner</Text>
              <Text style={styles.roleDescription}>
                Book mechanics for your vehicle repairs and services
              </Text>
              <Button
                title="Continue as Owner"
                onPress={() => handleRoleSelect('user')}
                fullWidth
                style={styles.continueButton}
              />
            </TouchableOpacity>
          </Card>

          <Card style={styles.roleCard}>
            <TouchableOpacity
              style={styles.roleButton}
              onPress={() => handleRoleSelect('mechanic')}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <Ionicons name="construct" size={48} color={Colors.primary} />
              </View>
              <Text style={styles.roleTitle}>I am a Mechanic</Text>
              <Text style={styles.roleDescription}>
                Accept jobs and serve customers in your area
              </Text>
              <Button
                title="Continue as Mechanic"
                onPress={() => handleRoleSelect('mechanic')}
                fullWidth
                style={styles.continueButton}
              />
            </TouchableOpacity>
          </Card>
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxxl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxxl,
  },
  rolesContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  roleCard: {
    marginBottom: Spacing.xl,
    padding: Spacing.xl,
  },
  roleButton: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  roleTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  roleDescription: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  continueButton: {
    marginTop: Spacing.md,
  },
});

export default RoleSelectionScreen;
