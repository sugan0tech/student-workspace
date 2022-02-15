import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ExamTimeSlice = createSlice({
  name: "examTime",
  initialState,
  reducers: {
    addExam: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addExam } = ExamTimeSlice.actions;
export default ExamTimeSlice.reducer;
