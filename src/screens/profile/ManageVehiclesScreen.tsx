import { useMemo, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { Colors, Radius, Spacing } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addVehicle, removeVehicle, selectProfile } from "../../store/slices/profileSlice";
import { PrimaryButton } from "../../components/PrimaryButton";
import type { Vehicle } from "../../types/models";

export function ManageVehiclesScreen() {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const [type, setType] = useState<Vehicle["type"]>("car");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [number, setNumber] = useState("");

  const vehicles = profile?.vehicles ?? [];
  const canAdd = useMemo(
    () => brand.trim() && model.trim() && number.trim(),
    [brand, model, number],
  );

  function onAdd() {
    if (!canAdd) return;
    const v: Vehicle = {
      id: `v${Date.now()}`,
      type,
      brand: brand.trim(),
      model: model.trim(),
      number: number.trim().toUpperCase(),
    };
    dispatch(addVehicle(v));
    setBrand("");
    setModel("");
    setNumber("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your vehicles</Text>

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

      <View style={{ gap: 10, marginTop: 12 }}>
        <Text style={styles.label}>Brand</Text>
        <TextInput
          value={brand}
          onChangeText={setBrand}
          placeholder="e.g., Maruti"
          placeholderTextColor="rgba(15,23,42,0.42)"
          style={styles.input}
        />
        <Text style={styles.label}>Model</Text>
        <TextInput
          value={model}
          onChangeText={setModel}
          placeholder="e.g., Baleno"
          placeholderTextColor="rgba(15,23,42,0.42)"
          style={styles.input}
        />
        <Text style={styles.label}>Number</Text>
        <TextInput
          value={number}
          onChangeText={setNumber}
          placeholder="e.g., MH 12 AB 1234"
          placeholderTextColor="rgba(15,23,42,0.42)"
          autoCapitalize="characters"
          style={styles.input}
        />
        <PrimaryButton title="Add vehicle" onPress={onAdd} disabled={!canAdd} />
      </View>

      <FlatList
        data={vehicles}
        keyExtractor={(v) => v.id}
        contentContainerStyle={{ paddingVertical: 16, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>
              {item.brand} {item.model} ({item.type})
            </Text>
            <Text style={styles.meta}>{item.number}</Text>
            <Text
              style={styles.remove}
              onPress={() => {
                Alert.alert("Remove vehicle?", "This will remove it from local state.", [
                  { text: "Cancel", style: "cancel" },
                  { text: "Remove", style: "destructive", onPress: () => dispatch(removeVehicle(item.id)) },
                ]);
              }}
            >
              Remove
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.bg },
  title: { fontSize: 18, fontWeight: "900", color: Colors.text },
  pickerRow: { flexDirection: "row", gap: 10, marginTop: 12 },
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
  label: { fontSize: 12, fontWeight: "800", color: Colors.muted, marginTop: 6 },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(15,23,42,0.14)",
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontWeight: "700",
    color: Colors.text,
  },
  note: { fontSize: 11, fontWeight: "700", color: Colors.muted, marginTop: 8 },
  card: { backgroundColor: "#fff", borderWidth: 1, borderColor: Colors.border, borderRadius: Radius.lg, padding: Spacing.md },
  name: { fontSize: 14, fontWeight: "900", color: Colors.text },
  meta: { marginTop: 6, fontSize: 12, fontWeight: "700", color: Colors.muted },
  remove: { marginTop: 10, fontSize: 12, fontWeight: "900", color: Colors.danger },
});

