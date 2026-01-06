import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User, Vehicle } from "../../types/models";

type ProfileState = {
  profile: User | null;
};

const initialState: ProfileState = {
  profile: null,
};

const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<User>) {
      state.profile = action.payload;
    },
    updateProfile(state, action: PayloadAction<Partial<Pick<User, "name" | "phone">>>) {
      if (!state.profile) return;
      state.profile = { ...state.profile, ...action.payload };
    },
    addVehicle(state, action: PayloadAction<Vehicle>) {
      if (!state.profile) return;
      state.profile.vehicles = [...state.profile.vehicles, action.payload];
    },
    updateVehicle(state, action: PayloadAction<Vehicle>) {
      if (!state.profile) return;
      state.profile.vehicles = state.profile.vehicles.map((v) =>
        v.id === action.payload.id ? action.payload : v,
      );
    },
    removeVehicle(state, action: PayloadAction<string>) {
      if (!state.profile) return;
      state.profile.vehicles = state.profile.vehicles.filter((v) => v.id !== action.payload);
    },
  },
});

export const { setProfile, updateProfile, addVehicle, updateVehicle, removeVehicle } =
  slice.actions;
export default slice.reducer;

export const selectProfile = (s: RootState) => s.profile.profile;

