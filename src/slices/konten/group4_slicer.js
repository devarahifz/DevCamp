import { createSlice } from "@reduxjs/toolkit";
import { getGroup4 } from "../../reducers/konten/group4_reducer";

const Group4Slicer = createSlice({
  name: "konten",
  initialState: {
    group4: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(getGroup4.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    });
    builder.addCase(getGroup4.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.group4 = action.payload;
    });
    builder.addCase(getGroup4.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  }
});

export default Group4Slicer.reducer;