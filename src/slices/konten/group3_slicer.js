import { createSlice } from "@reduxjs/toolkit";
import { getGroup3 } from "../../reducers/konten/group3_reducer";

const Group3Slicer = createSlice({
  name: "konten",
  initialState: {
    group3: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(getGroup3.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    });
    builder.addCase(getGroup3.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.group3 = action.payload;
    });
    builder.addCase(getGroup3.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  }
});

export default Group3Slicer.reducer;