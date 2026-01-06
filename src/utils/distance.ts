import type { Location } from "../types/models";

// Haversine distance in kilometers.
export function distanceKm(a: Location, b: Location): number {
  const R = 6371;
  const dLat = deg2rad(b.latitude - a.latitude);
  const dLon = deg2rad(b.longitude - a.longitude);
  const lat1 = deg2rad(a.latitude);
  const lat2 = deg2rad(b.latitude);

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1) *
      Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}

function deg2rad(d: number) {
  return (d * Math.PI) / 180;
}

