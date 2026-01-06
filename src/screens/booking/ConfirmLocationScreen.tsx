import { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { BookingFlowStackParamList } from "../../navigation/types";
import { Colors, Radius, Spacing } from "../../theme";
import { PrimaryButton } from "../../components/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectUserLocation, setUserLocation } from "../../store/slices/mechanicsSlice";
import { setDraftLocation } from "../../store/slices/bookingsSlice";
import { getCurrentLocation, openLocationSettings } from "../../utils/location";

type Props = NativeStackScreenProps<BookingFlowStackParamList, "ConfirmLocation">;

export function ConfirmLocationScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const userLocation = useAppSelector(selectUserLocation);

  useEffect(() => {
    if (userLocation) return;
    (async () => {
      const res = await getCurrentLocation();
      if (res.kind === "success") dispatch(setUserLocation(res.location));
    })();
  }, [dispatch, userLocation]);

  async function onUseLocation() {
    const res = await getCurrentLocation();
    if (res.kind === "success") {
      dispatch(setUserLocation(res.location));
      dispatch(setDraftLocation({ location: res.location, addressLabel: "Current location" }));
      navigation.navigate("VehicleDetails");
      return;
    }
    if (res.kind === "blocked") {
      Alert.alert("Permission blocked", "Enable location permission in settings.", [
        { text: "Cancel", style: "cancel" },
        { text: "Open settings", onPress: () => openLocationSettings() },
      ]);
      return;
    }
    Alert.alert("Location unavailable", "We couldn’t get your GPS location.");
  }

  const center = userLocation ?? { latitude: 18.5074, longitude: 73.8077 };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm location</Text>
      <Text style={styles.sub}>We’ll send the mechanic to this location.</Text>

      <View style={styles.mapCard}>
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: center.latitude,
            longitude: center.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={center} />
        </MapView>
      </View>

      <View style={{ marginTop: 16 }}>
        <PrimaryButton title="Use current location" onPress={onUseLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.lg, backgroundColor: Colors.bg },
  title: { fontSize: 18, fontWeight: "900", color: Colors.text },
  sub: { marginTop: 6, fontSize: 13, fontWeight: "700", color: Colors.muted },
  mapCard: {
    marginTop: 14,
    height: 220,
    borderRadius: Radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "#EEF6FF",
  },
});

