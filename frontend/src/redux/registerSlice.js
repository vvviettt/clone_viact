import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/auth";
export const registerAPI = createAsyncThunk("user/register", async (values) => {
  const result = await authApi.register(values);
  return result;
});

const initialState = {
  success: false,
  error: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    update: (state) => {
      state.success = !state.success;
    },
    reset: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [registerAPI.rejected]: (state, actions) => {
      // state.error = "";
      state.error = actions.error.message;
    },
    [registerAPI.fulfilled]: (state) => {
      state.success = true;
    },
  },
});

export const { update, reset } = registerSlice.actions;
export default registerSlice.reducer;
