import { createSlice } from "@reduxjs/toolkit";
import { getGroup2 } from "../../reducers/konten/group2_reducer";

const Group2Slicer = createSlice({
  name: "konten",
  initialState: {
    group2: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(getGroup2.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    });
    builder.addCase(getGroup2.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.group2 = action.payload;
    });
    builder.addCase(getGroup2.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  }
});

export default Group2Slicer.reducer;