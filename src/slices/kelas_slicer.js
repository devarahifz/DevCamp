import { fetchKelas } from "../reducers/kelas_reducer";
import { createSlice } from "@reduxjs/toolkit";

const KelasSlicer = createSlice({
  name: "kelas",
  initialState: {
    kelas: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchKelas.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(fetchKelas.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.kelas = action.payload
    })
    builder.addCase(fetchKelas.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
  }
})

export default KelasSlicer.reducer