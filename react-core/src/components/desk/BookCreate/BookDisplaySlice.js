import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const BookDisplaySlice = createSlice({
  name: "bookDisplay",
  initialState,
  reducers: {
    addBookDisplay: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addBookDisplay } = BookDisplaySlice.actions;
export default BookDisplaySlice.reducer;
