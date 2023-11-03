import { createSlice } from '@reduxjs/toolkit';
import { getGroup1 } from '../../reducers/konten/group1_reducer';

const Group1Slicer = createSlice({
  name: 'konten',
  initialState: {
    group1: [],
    isLoading: false,
    isSuccess: false,
    isError: null
  },
  extraReducers(builder) {
    builder.addCase(getGroup1.pending, state => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    });
    builder.addCase(getGroup1.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.group1 = action.payload;
    });
    builder.addCase(getGroup1.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  }
});

export default Group1Slicer.reducer;