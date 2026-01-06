import { StyleSheet, Text, View } from "react-native";
import { Colors, Spacing } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import { selectProfile, updateProfile } from "../../store/slices/profileSlice";
import { PrimaryButton } from "../../components/PrimaryButton";
import { TextField } from "../../components/TextField";
import { useState } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<ProfileStackParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  const [name, setName] = useState(profile?.name ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your profile</Text>

      <View style={{ gap: 12, marginTop: 14 }}>
        <TextField label="Name" value={name} onChangeText={setName} autoCapitalize="words" />
        <TextField label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <View>
          <PrimaryButton
            title="Save"
            onPress={() => dispatch(updateProfile({ name: name.trim(), phone: phone.trim() }))}
          />
        </View>
      </View>

      <View style={{ marginTop: 18 }}>
        <Text style={styles.section}>Manage</Text>
        <Text style={styles.link} onPress={() => navigation.navigate("ManageVehicles")}>
          Manage vehicles
        </Text>
      </View>

      <View style={{ marginTop: 24 }}>
        <PrimaryButton title="Logout" onPress={() => dispatch(logout())} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.bg },
  title: { fontSize: 18, fontWeight: "900", color: Colors.text },
  section: { fontSize: 13, fontWeight: "900", color: Colors.text },
  link: { marginTop: 10, fontSize: 13, fontWeight: "900", color: Colors.primary },
});

