export function toRad(deg) {
  return (deg * Math.PI) / 180;
}

// Haversine distance in kilometers
export function distanceKm(a, b) {
  if (!a || !b) return null;
  const R = 6371;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

export function withDistanceSorted(items, origin, getPoint) {
  const list = (items || []).map((it) => {
    const p = getPoint(it);
    const d = distanceKm(origin, p);
    return { ...it, distanceKm: d };
  });

  return list.sort((x, y) => {
    const dx = x.distanceKm ?? Number.POSITIVE_INFINITY;
    const dy = y.distanceKm ?? Number.POSITIVE_INFINITY;
    return dx - dy;
  });
}

