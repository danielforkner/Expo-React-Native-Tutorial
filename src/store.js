import { configureStore } from '@reduxjs/toolkit';
import authReducer from './components/auth/authSlice';
import eventsReducer from './components/events/eventsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
  },
});

export default store;
