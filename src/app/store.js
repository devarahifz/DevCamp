import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth_reducer';
import kelasReducer from '../slices/kelas_slicer';
import userReducer from '../slices/user_slicer';
import materiReducer from '../slices/materi_slicer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kelas: kelasReducer,
    user: userReducer,
    materi: materiReducer,
  },
});