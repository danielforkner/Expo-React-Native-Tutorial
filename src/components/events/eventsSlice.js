import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myEvents: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setMyEvents(state, action) {
      state.myEvents = action.payload;
    },
    addToMyEvents(state, action) {
      state.myEvents.push(action.payload);
    },
  },
});

export const { setMyEvents, addToMyEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
