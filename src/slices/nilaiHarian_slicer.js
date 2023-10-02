import { createSlice } from "@reduxjs/toolkit";
import { getNilaiHarian, postFeedback, deleteNilaiHarian } from "../reducers/nilaiHarian_reducer";

const NilaiHarianSlicer = createSlice({
  name: "nilaiHarian",
  initialState: {
    nilaiHarian: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(getNilaiHarian.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(getNilaiHarian.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.nilaiHarian = action.payload
    })
    builder.addCase(getNilaiHarian.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(postFeedback.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(postFeedback.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      // state.nilaiHarian = action.payload
    })
    builder.addCase(postFeedback.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(deleteNilaiHarian.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(deleteNilaiHarian.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.nilaiHarian = action.payload
    })
    builder.addCase(deleteNilaiHarian.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
  }
})

export default NilaiHarianSlicer.reducer