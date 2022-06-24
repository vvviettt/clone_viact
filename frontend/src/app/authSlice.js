import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.success = true;
    },
    logout: (state) => {
      state.success = true;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
