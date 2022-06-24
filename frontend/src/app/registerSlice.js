import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    update: (state) => {
      state.success = !state.success;
    },
  },
});

export const { update } = registerSlice.actions;
export default registerSlice.reducer;
