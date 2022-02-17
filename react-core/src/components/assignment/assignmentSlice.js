import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
  name: "assignments",
  initialState: [],
  reducers: {
    addAssignment: (state, action) => {
      state.push(action.payload);
    },
    changeIsComplete: (state, action) => {
      const id = action.payload;
      const index = state.map((assignment) => {
        if (id === assignment.id) {
          assignment.isCompleted = !assignment.isCompleted;
        }
        return assignment;
      });
      state = [...index];
    },
    deleteAssignment: (state, action) => {
      const id = action.payload;
      const index = state.filter((assignment) => {
        if (id === assignment.id) {
          return false;
        }
        return true;
      });
      state = [...index];
    },
  },
});

export const assignmentSelector = (state) => state.assignments;
export const { addAssignment, deleteAssignment, changeIsComplete } =
  assignmentSlice.actions;

export default assignmentSlice.reducer;
