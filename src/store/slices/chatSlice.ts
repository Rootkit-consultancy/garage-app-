import { createSlice, nanoid } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ChatMessage } from "../../types/models";

type ChatState = {
  messages: Record<string, ChatMessage[]>;
};

const initialState: ChatState = {
  messages: {},
};

const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage(
      state,
      action: PayloadAction<{ bookingId: string; sender: "user" | "mechanic"; text: string }>,
    ) {
      const msg: ChatMessage = {
        id: nanoid(10),
        bookingId: action.payload.bookingId,
        sender: action.payload.sender,
        text: action.payload.text,
        createdAt: Date.now(),
      };
      const prev = state.messages[action.payload.bookingId] ?? [];
      state.messages[action.payload.bookingId] = [...prev, msg];
    },
    ensureThread(state, action: PayloadAction<{ bookingId: string }>) {
      if (!state.messages[action.payload.bookingId]) {
        state.messages[action.payload.bookingId] = [
          {
            id: nanoid(10),
            bookingId: action.payload.bookingId,
            sender: "mechanic",
            text: "Hi! I’m on my way. Please share a landmark.",
            createdAt: Date.now() - 1000 * 60 * 2,
          },
        ];
      }
    },
  },
});

export const { sendMessage, ensureThread } = slice.actions;
export default slice.reducer;

export const selectMessagesForBooking = (bookingId: string) => (s: RootState) =>
  s.chat.messages[bookingId] ?? [];

