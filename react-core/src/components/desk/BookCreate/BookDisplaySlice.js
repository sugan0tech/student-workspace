import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios";

export const getBookDisplay = createAsyncThunk(
  "/bookDisplay/getBookDisplay",
  async (data) => {
    const response = await axios.post("/api/getBooks", data);

    return response.data;
  }
);
const initialState = [];

const BookDisplaySlice = createSlice({
  name: "bookDisplay",
  initialState,
  reducers: {
    addBookDisplay: (state, action) => {
      state.push(action.payload);
    },
  },
  extraReducers: {
    [getBookDisplay.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { addBookDisplay } = BookDisplaySlice.actions;
export default BookDisplaySlice.reducer;
