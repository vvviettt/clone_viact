import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/auth";

export const loginAPI = createAsyncThunk("user/login", async (params) => {
  const result = await authApi.login(params.key, params.password);
  return result;
});

const initialState = {
  isAuth: false,
  name: "",
  error: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.name = "";
      state.error = "";
      state.email = "";
    },
  },
  extraReducers: {
    [loginAPI.rejected]: (state, action) => {
      state.error = "";
      state.error = action.error.message;
    },
    [loginAPI.fulfilled]: (state, action) => {
      state.error = "";
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuth = true;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
