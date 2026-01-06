import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginThunk, selectAuthError, selectAuthStatus } from "../../store/slices/authSlice";
import { Colors, Spacing } from "../../theme";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TextField } from "../../components/TextField";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);

  const [email, setEmail] = useState("user@garage.app");
  const [password, setPassword] = useState("Password123!");

  async function onLogin() {
    const e = email.trim();
    if (!e.includes("@")) return Alert.alert("Invalid email", "Enter a valid email.");
    if (password.length < 6) return Alert.alert("Invalid password", "Minimum 6 characters.");
    try {
      await dispatch(loginThunk({ email: e, password })).unwrap();
    } catch (err) {
      Alert.alert("Login failed", err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subtitle}>Login to book a mechanic near you.</Text>

      <View style={{ gap: 12, marginTop: 18 }}>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
        />
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <View style={{ marginTop: 18 }}>
        <PrimaryButton
          title={status === "loading" ? "Signing in…" : "Login"}
          onPress={onLogin}
          disabled={status === "loading"}
        />
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Text style={styles.footer}>
        New here?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
          Create an account
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.bg,
    justifyContent: "center",
  },
  title: { fontSize: 26, fontWeight: "900", color: Colors.text },
  subtitle: { marginTop: 6, fontSize: 13, fontWeight: "700", color: Colors.muted },
  footer: { marginTop: 16, color: Colors.muted, fontWeight: "700", textAlign: "center" },
  link: { color: Colors.primary, fontWeight: "900" },
  error: { marginTop: 10, color: Colors.danger, fontWeight: "800", textAlign: "center" },
});

