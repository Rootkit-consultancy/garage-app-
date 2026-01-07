import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permission: 'unknown', // 'unknown' | 'granted' | 'denied'
  coords: null, // { latitude, longitude }
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setPermission(state, action) {
      state.permission = action.payload;
    },
    setCoords(state, action) {
      state.coords = action.payload;
    },
  },
});

export const { setPermission, setCoords } = locationSlice.actions;
export default locationSlice.reducer;

