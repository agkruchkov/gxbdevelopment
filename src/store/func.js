import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "func",
  initialState: "",
  reducers: {
    added: (state, action) => action.payload,
  },
});

export const getFunc = (state) => state.func;

export const { added } = slice.actions;

export default slice.reducer;
