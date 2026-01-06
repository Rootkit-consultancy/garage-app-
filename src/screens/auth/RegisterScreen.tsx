import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Colors, Spacing } from "../../theme";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TextField } from "../../components/TextField";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerThunk, selectAuthStatus } from "../../store/slices/authSlice";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AuthStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onRegister() {
    const e = email.trim();
    if (name.trim().length < 2) return Alert.alert("Name required", "Enter your name.");
    if (!e.includes("@")) return Alert.alert("Invalid email", "Enter a valid email.");
    if (password.length < 6) return Alert.alert("Weak password", "Minimum 6 characters.");
    try {
      await dispatch(registerThunk({ name: name.trim(), email: e, password })).unwrap();
    } catch (err) {
      Alert.alert("Registration failed", err instanceof Error ? err.message : "Unknown error");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Get help fast, wherever you are.</Text>

      <View style={{ gap: 12, marginTop: 18 }}>
        <TextField label="Name" value={name} onChangeText={setName} placeholder="Your name" autoCapitalize="words" />
        <TextField label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />
        <TextField label="Password" value={password} onChangeText={setPassword} placeholder="Create a password" secureTextEntry />
      </View>

      <View style={{ marginTop: 18 }}>
        <PrimaryButton title={status === "loading" ? "Creating…" : "Register"} onPress={onRegister} disabled={status === "loading"} />
      </View>

      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.goBack()}>
          Login
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.bg, justifyContent: "center" },
  title: { fontSize: 26, fontWeight: "900", color: Colors.text },
  subtitle: { marginTop: 6, fontSize: 13, fontWeight: "700", color: Colors.muted },
  footer: { marginTop: 16, color: Colors.muted, fontWeight: "700", textAlign: "center" },
  link: { color: Colors.primary, fontWeight: "900" },
});

