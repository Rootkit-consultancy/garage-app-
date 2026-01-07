import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { login } from '../../store/slices/authSlice';

export default function AuthScreen({ navigation }) {
  const dispatch = useDispatch();
  const [mode, setMode] = useState('phone'); // 'phone' | 'email'
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState('');
  const [sent, setSent] = useState(false);

  const placeholder = useMemo(() => (mode === 'phone' ? 'Phone number' : 'Email'), [mode]);

  const onSendOtp = () => {
    setSent(true);
  };

  const onVerify = () => {
    dispatch(login());
    navigation.replace('RoleSelection');
  };

  return (
    <KeyboardAvoidingView
      style={styles.safe}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.sub}>Login with OTP to continue</Text>
      </View>

      <View style={styles.toggle}>
        <Chip label="Phone" selected={mode === 'phone'} onPress={() => setMode('phone')} />
        <Chip label="Email" selected={mode === 'email'} onPress={() => setMode('email')} />
      </View>

      <Card>
        <Text style={styles.label}>{placeholder}</Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={Colors.muted}
          keyboardType={mode === 'phone' ? 'phone-pad' : 'email-address'}
          autoCapitalize="none"
          style={styles.input}
        />

        {sent ? (
          <>
            <Text style={[styles.label, { marginTop: Spacing.lg }]}>OTP</Text>
            <TextInput
              value={otp}
              onChangeText={setOtp}
              placeholder="123456"
              placeholderTextColor={Colors.muted}
              keyboardType="number-pad"
              style={styles.input}
            />
          </>
        ) : null}

        <View style={{ marginTop: Spacing.lg }}>
          {!sent ? (
            <Button title="Send OTP" onPress={onSendOtp} fullWidth disabled={!value.trim()} />
          ) : (
            <Button title="Verify & Continue" onPress={onVerify} fullWidth disabled={otp.trim().length < 4} />
          )}
        </View>
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background, padding: Spacing.xl },
  header: { marginTop: Spacing.lg, marginBottom: Spacing.lg },
  title: { ...Typography.h2, color: Colors.text },
  sub: { ...Typography.sub, color: Colors.subtext, marginTop: Spacing.xs },
  toggle: { flexDirection: 'row', marginBottom: Spacing.lg },
  label: { ...Typography.cap, color: Colors.subtext, marginBottom: Spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderRadius: 14,
    color: Colors.text,
    ...Typography.body,
  },
});

