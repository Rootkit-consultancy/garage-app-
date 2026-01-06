import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const AuthScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [useEmail, setUseEmail] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = () => {
    if (useEmail ? email : phoneNumber) {
      setOtpSent(true);
      // TODO: Implement OTP sending logic
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      navigation.navigate('RoleSelection');
      // TODO: Implement OTP verification
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="construct" size={64} color={Colors.primary} />
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <Card style={styles.card}>
          {!otpSent ? (
            <>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggle, !useEmail && styles.toggleActive]}
                  onPress={() => setUseEmail(false)}
                >
                  <Text style={[styles.toggleText, !useEmail && styles.toggleTextActive]}>
                    Phone
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggle, useEmail && styles.toggleActive]}
                  onPress={() => setUseEmail(true)}
                >
                  <Text style={[styles.toggleText, useEmail && styles.toggleTextActive]}>
                    Email
                  </Text>
                </TouchableOpacity>
              </View>

              {useEmail ? (
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor={Colors.textLight}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              ) : (
                <View style={styles.inputContainer}>
                  <Ionicons name="call-outline" size={20} color={Colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter phone number"
                    placeholderTextColor={Colors.textLight}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                  />
                </View>
              )}

              <Button
                title="Send OTP"
                onPress={handleSendOTP}
                fullWidth
                style={styles.button}
              />
            </>
          ) : (
            <>
              <Text style={styles.otpLabel}>Enter OTP</Text>
              <Text style={styles.otpSubtext}>
                We sent a code to {useEmail ? email : `+91 ${phoneNumber}`}
              </Text>
              <View style={styles.otpContainer}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    value={otp[index] || ''}
                    onChangeText={(text) => {
                      const newOtp = otp.split('');
                      newOtp[index] = text;
                      setOtp(newOtp.join('').slice(0, 6));
                    }}
                    keyboardType="number-pad"
                    maxLength={1}
                  />
                ))}
              </View>
              <Button
                title="Verify OTP"
                onPress={handleVerifyOTP}
                fullWidth
                style={styles.button}
                disabled={otp.length !== 6}
              />
              <TouchableOpacity onPress={() => setOtpSent(false)}>
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </Card>
      </View>
    </KeyboardAvoidingView>
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
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxxl,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    marginTop: Spacing.lg,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  card: {
    padding: Spacing.xl,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.grey,
    borderRadius: BorderRadius.md,
    padding: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  toggle: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  toggleActive: {
    backgroundColor: Colors.white,
  },
  toggleText: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  toggleTextActive: {
    color: Colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
    paddingVertical: Spacing.md,
  },
  button: {
    marginTop: Spacing.md,
  },
  otpLabel: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  otpSubtext: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    textAlign: 'center',
    ...Typography.h2,
    color: Colors.text,
  },
  resendText: {
    ...Typography.body,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});

export default AuthScreen;
