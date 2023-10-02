import { postTugas, getTugas, getFiles, deleteTugas } from "../reducers/tugas_reducer";
import { createSlice } from "@reduxjs/toolkit";

const TugasSlicer = createSlice({
  name: "tugas",
  initialState: {
    tugas: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(postTugas.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(postTugas.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.tugas.push(action.payload)
    })
    builder.addCase(postTugas.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(getTugas.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(getTugas.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.tugas = action.payload
    })
    builder.addCase(getTugas.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(getFiles.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.files = action.payload
    })
    builder.addCase(getFiles.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(deleteTugas.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(deleteTugas.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.tugas = state.tugas.filter((tugas) => tugas.id !== action.payload)
    })
    builder.addCase(deleteTugas.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
  }
})

export default TugasSlicer.reducer