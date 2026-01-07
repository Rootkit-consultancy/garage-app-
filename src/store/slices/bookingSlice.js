import { createSlice } from '@reduxjs/toolkit';
import { mockBookings } from '../../data/mock';

const initialState = {
  items: mockBookings,
  draft: {
    vehicleId: null,
    service: '',
    note: '',
    address: '',
    schedule: { type: 'asap', datetime: null },
    mechanicId: null,
    payment: 'card',
  },
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setDraft(state, action) {
      state.draft = { ...state.draft, ...action.payload };
    },
    createBooking(state, action) {
      const b = action.payload;
      state.items = [{ ...b, id: `b_${Date.now()}`, status: 'ongoing', createdAt: Date.now() }, ...state.items];
      state.draft = initialState.draft;
    },
    updateBookingStatus(state, action) {
      const { id, patch } = action.payload;
      const idx = state.items.findIndex((b) => b.id === id);
      if (idx !== -1) state.items[idx] = { ...state.items[idx], ...patch };
    },
  },
});

export const { setDraft, createBooking, updateBookingStatus } = bookingSlice.actions;
export default bookingSlice.reducer;

