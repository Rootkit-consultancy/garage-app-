import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { User } from "../../types/models";
import * as mockAuth from "../../services/mockAuth";

type AuthState = {
  status: "idle" | "loading" | "authenticated" | "error";
  user: User | null;
  error?: string;
};

const initialState: AuthState = {
  status: "idle",
  user: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    return await mockAuth.login(payload);
  },
);

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (payload: { name: string; email: string; password: string }) => {
    return await mockAuth.register(payload);
  },
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = undefined;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "authenticated";
      state.error = undefined;
    },
  },
  extraReducers: (b) => {
    b.addCase(loginThunk.pending, (s) => {
      s.status = "loading";
      s.error = undefined;
    });
    b.addCase(loginThunk.fulfilled, (s, a) => {
      s.status = "authenticated";
      s.user = a.payload;
      s.error = undefined;
    });
    b.addCase(loginThunk.rejected, (s, a) => {
      s.status = "error";
      s.error = a.error.message ?? "Login failed";
    });

    b.addCase(registerThunk.pending, (s) => {
      s.status = "loading";
      s.error = undefined;
    });
    b.addCase(registerThunk.fulfilled, (s, a) => {
      s.status = "authenticated";
      s.user = a.payload;
      s.error = undefined;
    });
    b.addCase(registerThunk.rejected, (s, a) => {
      s.status = "error";
      s.error = a.error.message ?? "Register failed";
    });
  },
});

export const { logout, setUser } = slice.actions;
export default slice.reducer;

export const selectAuthUser = (s: RootState) => s.auth.user;
export const selectAuthStatus = (s: RootState) => s.auth.status;
export const selectAuthError = (s: RootState) => s.auth.error;

