import { createSlice } from '@reduxjs/toolkit'
import { getUserById, register, login, updateUser, updatePassword, verifyEmail, getUserByEmail } from '../reducers/user_reducer'

const UserSlicer = createSlice({
  name: 'user',
  initialState: {
    user: [],
    isLoading: false,
    isSuccess: false,
    isError: null,
  },
  extraReducers(builder) {
    builder.addCase(register.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(verifyEmail.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(login.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(getUserById.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(updatePassword.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
    builder.addCase(getUserByEmail.pending, (state) => {
      state.isLoading = true
      state.isError = null
      state.isSuccess = false
    })
    builder.addCase(getUserByEmail.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    builder.addCase(getUserByEmail.rejected, (state, action) => {
      state.isLoading = false
      state.isError = action.error.message
    })
  }
})

export default UserSlicer.reducer