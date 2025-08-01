// src/store/index.ts - Make sure this looks correct
import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from './slices/patientsSlice';

export const store = configureStore({
  reducer: {
    patients: patientsReducer, // Make sure this key matches what you use in useAppSelector
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
