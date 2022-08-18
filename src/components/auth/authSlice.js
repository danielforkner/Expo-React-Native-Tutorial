import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

const initialState = {
  status: 'idle',
  isLoggedIn: false,
  currentUser: { uid: null, name: null, email: null, docid: null },
  myEvents: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState(state) {
      state = initialState;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUser(state, action) {
      state.currentUser = action.payload;
    },
    setMyEvents(state, action) {
      state.myEvents = action.payload;
    },
    addToMyEvents(state, action) {
      state.myEvents.push(action.payload);
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  setIsLoggedIn,
  resetState,
  setStatus,
  setUser,
  setMyEvents,
  addToMyEvents,
} = authSlice.actions;
export default authSlice.reducer;
