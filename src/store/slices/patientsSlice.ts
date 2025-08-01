// src/store/slices/patientsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PatientsState {
  dateFilter: string;
  emailFilter: string;
  phoneFilter: string;
  insuranceFilter: string;
}

const initialState: PatientsState = {
  dateFilter: '',
  emailFilter: '',
  phoneFilter: '',
  insuranceFilter: '',
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setDateFilter: (state, action: PayloadAction<string>) => {
      state.dateFilter = action.payload;
    },
    setEmailFilter: (state, action: PayloadAction<string>) => {
      state.emailFilter = action.payload;
    },
    setPhoneFilter: (state, action: PayloadAction<string>) => {
      state.phoneFilter = action.payload;
    },
    setInsuranceFilter: (state, action: PayloadAction<string>) => {
      state.insuranceFilter = action.payload;
    },
    clearAllFilters: (state) => {
      state.dateFilter = '';
      state.emailFilter = '';
      state.phoneFilter = '';
      state.insuranceFilter = '';
    },
  },
});

export const {
  setDateFilter,
  setEmailFilter,
  setPhoneFilter,
  setInsuranceFilter,
  clearAllFilters,
} = patientsSlice.actions;

export default patientsSlice.reducer;
