import { createSlice } from '@reduxjs/toolkit';
import { mockUser } from '../../data/mock';

const initialState = {
  isOnboarded: false,
  isAuthed: false,
  role: null, // 'user' | 'mechanic'
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    completeOnboarding(state) {
      state.isOnboarded = true;
    },
    login(state) {
      state.isAuthed = true;
      state.user = mockUser;
    },
    logout(state) {
      state.isAuthed = false;
      state.role = null;
      state.user = null;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { completeOnboarding, login, logout, setRole } = authSlice.actions;
export default authSlice.reducer;

