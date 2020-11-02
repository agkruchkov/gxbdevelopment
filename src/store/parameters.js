import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "parameters",
  initialState: { fromX: 0, toX: 1 },
  reducers: {
    added: (state, action) => {
      return {
        fromX: +action.payload.fromX,
        toX: +action.payload.toX,
      };
    },
  },
});

export const getParameters = (state) => state.parameters;

export const { added } = slice.actions;

export default slice.reducer;
