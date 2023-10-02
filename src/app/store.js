import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth_reducer';
import kelasReducer from '../slices/kelas_slicer';
import userReducer from '../slices/user_slicer';
import materiReducer from '../slices/materi_slicer';
import tugasReducer from '../slices/tugas_slicer';
import nilaiHarianReducer from '../slices/nilaiHarian_slicer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kelas: kelasReducer,
    user: userReducer,
    materi: materiReducer,
    tugas: tugasReducer,
    nilaiHarian: nilaiHarianReducer,
  },
});