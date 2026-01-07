import { createSlice } from '@reduxjs/toolkit';
import { mockMessages, mockThreads } from '../../data/mock';

const initialState = {
  threads: mockThreads,
  messagesByThreadId: mockMessages,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage(state, action) {
      const { threadId, text } = action.payload;
      const list = state.messagesByThreadId[threadId] || [];
      const msg = { id: `msg_${Date.now()}`, from: 'me', text, ts: Date.now() };
      state.messagesByThreadId[threadId] = [...list, msg];

      const tIdx = state.threads.findIndex((t) => t.id === threadId);
      if (tIdx !== -1) {
        state.threads[tIdx] = {
          ...state.threads[tIdx],
          lastMessage: text,
          updatedAt: Date.now(),
        };
      }
    },
  },
});

export const { sendMessage } = chatSlice.actions;
export default chatSlice.reducer;

