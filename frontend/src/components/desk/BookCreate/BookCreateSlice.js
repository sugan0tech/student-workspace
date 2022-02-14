import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const BookCreateSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addBook } = BookCreateSlice.actions;
export default BookCreateSlice.reducer;
