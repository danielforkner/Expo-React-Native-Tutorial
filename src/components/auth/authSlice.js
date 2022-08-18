import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

const initialState = {
  isLoggedIn: false,
  currentUser: { uid: null, name: null, email: null, docid: null },
  myEvents: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
  },
});

export const { setIsLoggedIn, setUser, setMyEvents, addToMyEvents } =
  authSlice.actions;
export default authSlice.reducer;
