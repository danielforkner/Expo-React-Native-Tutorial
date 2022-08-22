import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  myEvents: [],
  events: [],
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload;
    },
    setMyEvents(state, action) {
      state.myEvents = action.payload;
    },
    addToMyEvents(state, action) {
      state.myEvents.push(action.payload);
    },
  },
});

export const { setMyEvents, addToMyEvents, setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
