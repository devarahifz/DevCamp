import { createSlice } from "@reduxjs/toolkit";
import { getCarousel } from "../../reducers/konten/carousel_reducer";

const CarouselSlicer = createSlice({
  name: "konten",
  initialState: {
    carousel: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(getCarousel.pending, (state) => {
      state.isLoading = true;
      state.isError = null;
      state.isSuccess = false;
    });
    builder.addCase(getCarousel.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.carousel = action.payload;
    });
    builder.addCase(getCarousel.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message;
    });
  }
});

export default CarouselSlicer.reducer;