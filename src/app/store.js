import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth_reducer';
import kelasReducer from '../slices/kelas_slicer';
import userReducer from '../slices/user_slicer';
import materiReducer from '../slices/materi_slicer';
import tugasReducer from '../slices/tugas_slicer';
import nilaiHarianReducer from '../slices/nilaiHarian_slicer';
import group1Reducer from '../slices/konten/group1_slicer';
import group2Reducer from '../slices/konten/group2_slicer';
import carouselReducer from '../slices/konten/carousel_slicer';
import group3Reducer from '../slices/konten/group3_slicer';
import group4Reducer from '../slices/konten/group4_slicer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kelas: kelasReducer,
    user: userReducer,
    materi: materiReducer,
    tugas: tugasReducer,
    nilaiHarian: nilaiHarianReducer,
    group1: group1Reducer,
    group2: group2Reducer,
    carousel: carouselReducer,
    group3: group3Reducer,
    group4: group4Reducer,
  },
});