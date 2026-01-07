import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import locationReducer from './slices/locationSlice';
import bookingReducer from './slices/bookingSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
    bookings: bookingReducer,
    chat: chatReducer,
  },
});

