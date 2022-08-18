import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../../firebase';

const initialState = {
  isLoggedIn: false,
  currentUser: { uid: null, name: null, email: null },
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
  },
});

export const { setIsLoggedIn, setUser } = authSlice.actions;
export default authSlice.reducer;
