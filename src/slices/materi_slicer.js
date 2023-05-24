import { fetchMateri } from "../reducers/materi_reducer";
import { createSlice } from "@reduxjs/toolkit";

const MateriSlicer = createSlice({
  name: "materi",
  initialState: {
    materi: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchMateri.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(fetchMateri.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.materi = action.payload
    })
    builder.addCase(fetchMateri.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
  }
})

export default MateriSlicer.reducer