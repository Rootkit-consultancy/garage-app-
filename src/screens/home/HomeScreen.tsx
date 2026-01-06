import { useCallback, useMemo, useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList, RootStackParamList } from "../../navigation/types";
import { Colors, Spacing } from "../../theme";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectMechanicsSorted, selectUserLocation, setUserLocation } from "../../store/slices/mechanicsSlice";
import { MechanicCard } from "../../components/MechanicCard";
import { getCurrentLocation, openLocationSettings } from "../../utils/location";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import type { Mechanic } from "../../types/models";

type Props = NativeStackScreenProps<HomeStackParamList, "Home">;

export function HomeScreen(_props: Props) {
  const dispatch = useAppDispatch();
  const userLocation = useAppSelector(selectUserLocation);
  const mechanics = useAppSelector(selectMechanicsSorted);
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [160, 360, "75%"], []);

  const selected = selectedId ? mechanics.find((m) => m.id === selectedId) ?? null : null;

  const center = userLocation ?? { latitude: 18.5074, longitude: 73.8077 };

  const onLocate = useCallback(async () => {
    const res = await getCurrentLocation();
    if (res.kind === "success") {
      dispatch(setUserLocation(res.location));
      return;
    }
    if (res.kind === "blocked") {
      Alert.alert(
        "Location permission blocked",
        "Enable location permission in settings to show nearby mechanics.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open settings", onPress: () => openLocationSettings() },
        ],
      );
      return;
    }
    if (res.kind === "denied") {
      Alert.alert("Permission denied", "We need location to sort mechanics by distance.");
      return;
    }
    Alert.alert("Location error", res.kind === "error" ? res.message : "Unable to fetch location.");
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={false}
      >
        {mechanics.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.location.latitude, longitude: m.location.longitude }}
            title={m.name}
            onPress={() => {
              setSelectedId(m.id);
              sheetRef.current?.snapToIndex(1);
            }}
          />
        ))}
      </MapView>

      <View style={styles.topOverlay}>
        <Text style={styles.topTitle}>Nearby mechanics</Text>
        <Text style={styles.topAction} onPress={onLocate}>
          {userLocation ? "Refresh location" : "Enable location"}
        </Text>
      </View>

      <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={1} enablePanDownToClose={false}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>{selected ? "Mechanic" : "Nearest first"}</Text>
          {selected ? (
            <Text style={styles.sheetAction} onPress={() => setSelectedId(null)}>
              Back to list
            </Text>
          ) : null}
        </View>

        {selected ? (
          <View style={{ padding: Spacing.md, gap: 12 }}>
            <MechanicCard
              mechanic={selected}
              userLocation={userLocation}
              onBook={() => rootNav.navigate("BookingFlow", { mechanicId: selected.id })}
            />
            <Text style={styles.detailText}>
              Services: {selected.services.join(", ")}
            </Text>
            <Text style={styles.detailText}>
              Price range: ₹{selected.priceRange.min}–₹{selected.priceRange.max}
            </Text>
          </View>
        ) : (
          <BottomSheetFlatList<Mechanic>
            data={mechanics}
            keyExtractor={(m: Mechanic) => m.id}
            contentContainerStyle={{ padding: Spacing.md, gap: 12 }}
            renderItem={({ item }: { item: Mechanic }) => (
              <View>
                <MechanicCard
                  mechanic={item}
                  userLocation={userLocation}
                  onBook={() => rootNav.navigate("BookingFlow", { mechanicId: item.id })}
                />
                <Text
                  style={styles.selectHint}
                  onPress={() => {
                    setSelectedId(item.id);
                    sheetRef.current?.snapToIndex(1);
                  }}
                >
                  View details
                </Text>
              </View>
            )}
          />
        )}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  topOverlay: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topTitle: { fontSize: 14, fontWeight: "900", color: Colors.text },
  topAction: { fontSize: 12, fontWeight: "900", color: Colors.primary },
  sheetHeader: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetTitle: { fontSize: 13, fontWeight: "900", color: Colors.text },
  sheetAction: { fontSize: 12, fontWeight: "900", color: Colors.primary },
  detailText: { fontSize: 12, fontWeight: "700", color: Colors.muted },
  selectHint: { marginTop: 8, fontSize: 12, fontWeight: "800", color: Colors.primary },
});

