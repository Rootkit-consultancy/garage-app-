import { Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from "react-native-permissions";
import type { Location } from "../types/models";

export type LocationResult =
  | { kind: "success"; location: Location }
  | { kind: "denied" }
  | { kind: "blocked" }
  | { kind: "unavailable" }
  | { kind: "error"; message: string };

export async function getCurrentLocation(): Promise<LocationResult> {
  const perm =
    Platform.OS === "ios"
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

  const current = await check(perm);
  const status = current === RESULTS.DENIED ? await request(perm) : current;

  if (status === RESULTS.BLOCKED) return { kind: "blocked" };
  if (status === RESULTS.DENIED) return { kind: "denied" };
  if (status === RESULTS.UNAVAILABLE) return { kind: "unavailable" };
  if (status !== RESULTS.GRANTED && status !== RESULTS.LIMITED) {
    return { kind: "denied" };
  }

  return await new Promise<LocationResult>((resolve) => {
    Geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          kind: "success",
          location: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            accuracy: pos.coords.accuracy ?? undefined,
          },
        });
      },
      (err) => resolve({ kind: "error", message: err.message }),
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 10_000,
      },
    );
  });
}

export async function openLocationSettings() {
  await openSettings();
}

