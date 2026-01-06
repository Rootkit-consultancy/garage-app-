import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Location, Mechanic } from "../../types/models";
import { distanceKm } from "../../utils/distance";

type MechanicsState = {
  userLocation: Location | null;
  items: Mechanic[];
};

const initialState: MechanicsState = {
  userLocation: null,
  items: [
    {
      id: "m1",
      name: "Rahul Autocare",
      rating: 4.8,
      services: ["Engine issue", "Puncture", "General service"],
      priceRange: { min: 249, max: 799 },
      etaMin: 15,
      phone: "+91 90000 11111",
      location: { latitude: 18.5074, longitude: 73.8077 },
    },
    {
      id: "m2",
      name: "Sakshi Motors",
      rating: 4.9,
      services: ["Battery", "General service", "Pickup & drop"],
      priceRange: { min: 199, max: 699 },
      etaMin: 12,
      phone: "+91 90000 22222",
      location: { latitude: 18.5099, longitude: 73.8142 },
    },
    {
      id: "m3",
      name: "Om Bike Care",
      rating: 4.7,
      services: ["Puncture", "Chain", "General service"],
      priceRange: { min: 149, max: 499 },
      etaMin: 10,
      phone: "+91 90000 33333",
      location: { latitude: 18.5128, longitude: 73.8021 },
    },
  ],
};

const slice = createSlice({
  name: "mechanics",
  initialState,
  reducers: {
    setUserLocation(state, action: PayloadAction<Location>) {
      state.userLocation = action.payload;
    },
  },
});

export const { setUserLocation } = slice.actions;
export default slice.reducer;

export const selectUserLocation = (s: RootState) => s.mechanics.userLocation;
export const selectMechanics = (s: RootState) => s.mechanics.items;
export const selectMechanicsSorted = (s: RootState) => {
  const loc = s.mechanics.userLocation;
  const items = s.mechanics.items;
  if (!loc) return items;
  return [...items].sort(
    (a, b) => distanceKm(loc, a.location) - distanceKm(loc, b.location),
  );
};

