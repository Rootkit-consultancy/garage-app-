import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import mechanicsReducer from "./slices/mechanicsSlice";
import bookingsReducer from "./slices/bookingsSlice";
import chatReducer from "./slices/chatSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mechanics: mechanicsReducer,
    bookings: bookingsReducer,
    chat: chatReducer,
    profile: profileReducer,
  },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        // We store timestamps and plain objects only; keep defaults otherwise.
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

