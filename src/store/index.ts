import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './contacts/contactSlice';

const store = configureStore({
  reducer: contactSlice,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
