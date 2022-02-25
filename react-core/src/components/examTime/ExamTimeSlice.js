import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getExams = createAsyncThunk(
  "/examTime/getBooks",
  async (assignments) => {
    const response = await axios.post("/api/getBooks", assignments);

    return response.data;
  }
);
const initialState = [];

const ExamTimeSlice = createSlice({
  name: "examTime",
  initialState,
  reducers: {
    addExam: (state, action) => {
      console.log(action.payload);
      state.push(action.payload);
    },
    deleteExam: (state, action) => {
      const id = action.payload;
      let index = 0;
      state.map((assignment, idx) => {
        if (id === assignment[0].id) {
          console.log("detected");
          index = idx;
        }
        return true;
      });

      state.splice(index, 1);
    },
  },
  extraReducers: {
    [getExams.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
  },
});
export const selectExam = (state) => state.examTime;
export const { addExam, deleteExam } = ExamTimeSlice.actions;
export default ExamTimeSlice.reducer;
