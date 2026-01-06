import { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BookingFlowStackParamList } from "../../navigation/types";
import { Colors, Radius, Spacing } from "../../theme";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectProfile } from "../../store/slices/profileSlice";
import { setDraftVehicle } from "../../store/slices/bookingsSlice";
import type { Vehicle } from "../../types/models";

type Props = NativeStackScreenProps<BookingFlowStackParamList, "VehicleDetails">;

export function VehicleDetailsScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  const defaultVehicle = profile?.vehicles?.[0];

  const [type, setType] = useState<Vehicle["type"]>(defaultVehicle?.type ?? "car");
  const [brand, setBrand] = useState(defaultVehicle?.brand ?? "");
  const [model, setModel] = useState(defaultVehicle?.model ?? "");
  const [number, setNumber] = useState(defaultVehicle?.number ?? "");

  const canContinue = useMemo(
    () => brand.trim().length > 1 && model.trim().length > 1 && number.trim().length > 3,
    [brand, model, number],
  );

  function onNext() {
    if (!canContinue) {
      Alert.alert("Vehicle details", "Please fill brand, model and number.");
      return;
    }
    dispatch(
      setDraftVehicle({
        id: `v${Date.now()}`,
        type,
        brand: brand.trim(),
        model: model.trim(),
        number: number.trim().toUpperCase(),
      }),
    );
    navigation.navigate("Summary");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle details</Text>
      <Text style={styles.sub}>This helps the mechanic bring the right tools.</Text>

      <View style={styles.pickerRow}>
        <Text
          style={[styles.pill, type === "car" ? styles.pillActive : null]}
          onPress={() => setType("car")}
        >
          Car
        </Text>
        <Text
          style={[styles.pill, type === "bike" ? styles.pillActive : null]}
          onPress={() => setType("bike")}
        >
          Bike
        </Text>
      </View>

      <View style={{ gap: 10, marginTop: 14 }}>
        <LabeledInput label="Brand" value={brand} onChangeText={setBrand} placeholder="e.g., Maruti" />
        <LabeledInput label="Model" value={model} onChangeText={setModel} placeholder="e.g., Baleno" />
        <LabeledInput label="Number" value={number} onChangeText={setNumber} placeholder="e.g., MH 12 AB 1234" autoCapitalize="characters" />
      </View>

      <View style={{ marginTop: 18 }}>
        <PrimaryButton title="Continue" onPress={onNext} disabled={!canContinue} />
      </View>
    </View>
  );
}

function LabeledInput({
  label,
  value,
  onChangeText,
  placeholder,
  autoCapitalize,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  autoCapitalize?: "none" | "characters" | "words";
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(15,23,42,0.42)"
        autoCapitalize={autoCapitalize ?? "none"}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.bg },
  title: { fontSize: 18, fontWeight: "900", color: Colors.text },
  sub: { marginTop: 6, fontSize: 13, fontWeight: "700", color: Colors.muted },
  pickerRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#fff",
    fontWeight: "900",
    color: Colors.text,
    overflow: "hidden",
  },
  pillActive: { backgroundColor: "rgba(47,107,255,0.12)", color: Colors.primary, borderColor: "rgba(47,107,255,0.24)" },
  label: { color: Colors.muted, fontWeight: "800", fontSize: 12 },
  input: {
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.14)",
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    color: Colors.text,
    fontWeight: "700",
  },
});

