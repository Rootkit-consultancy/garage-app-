import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Booking, BookingStatus, Location, ProblemType, Vehicle } from "../../types/models";

type BookingDraft = {
  problemType?: ProblemType;
  location?: Location;
  addressLabel?: string;
  vehicle?: Vehicle;
  mechanicId?: string;
};

type BookingsState = {
  draft: BookingDraft;
  items: Booking[];
};

const initialState: BookingsState = {
  draft: {},
  items: [],
};

const slice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    startDraft(state, action: PayloadAction<{ mechanicId: string }>) {
      state.draft = { mechanicId: action.payload.mechanicId };
    },
    setDraftProblem(state, action: PayloadAction<ProblemType>) {
      state.draft.problemType = action.payload;
    },
    setDraftLocation(state, action: PayloadAction<{ location: Location; addressLabel: string }>) {
      state.draft.location = action.payload.location;
      state.draft.addressLabel = action.payload.addressLabel;
    },
    setDraftVehicle(state, action: PayloadAction<Vehicle>) {
      state.draft.vehicle = action.payload;
    },
    clearDraft(state) {
      state.draft = {};
    },
    createBooking(
      state,
      action: PayloadAction<{
        id?: string;
        customerId: string;
        mechanicId: string;
        problemType: ProblemType;
        location: Location;
        addressLabel: string;
        vehicle: Vehicle;
      }>,
    ) {
      const now = Date.now();
      const booking: Booking = {
        id: action.payload.id ?? nanoid(10),
        customerId: action.payload.customerId,
        mechanicId: action.payload.mechanicId,
        problemType: action.payload.problemType,
        location: action.payload.location,
        addressLabel: action.payload.addressLabel,
        vehicle: action.payload.vehicle,
        status: "pending",
        createdAt: now,
        updatedAt: now,
      };
      state.items = [booking, ...state.items];
    },
    setBookingStatus(state, action: PayloadAction<{ id: string; status: BookingStatus }>) {
      const b = state.items.find((x) => x.id === action.payload.id);
      if (!b) return;
      b.status = action.payload.status;
      b.updatedAt = Date.now();
    },
  },
});

export const {
  startDraft,
  setDraftProblem,
  setDraftLocation,
  setDraftVehicle,
  clearDraft,
  createBooking,
  setBookingStatus,
} = slice.actions;
export default slice.reducer;

export const selectBookingDraft = (s: RootState) => s.bookings.draft;
export const selectBookings = (s: RootState) => s.bookings.items;
export const selectActiveBooking = (s: RootState) =>
  s.bookings.items.find((b) => b.status === "pending" || b.status === "accepted" || b.status === "on_the_way") ??
  null;
export const selectBookingById = (id: string) => (s: RootState) =>
  s.bookings.items.find((b) => b.id === id) ?? null;

