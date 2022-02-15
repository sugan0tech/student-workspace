import { createSlice } from "@reduxjs/toolkit";

const assignmentSlice = createSlice({
  name: "assignments",
  initialState: [],
  reducers: {
    addAssignment: (state, action) => {
      state.push(action.payload);
    },
    deleteAssignment: (state, action) => {
      const id = action.payload;
      const index = state.map((assignment, index) => {
        if (id === assignment.id) {
          return index;
        }
        return null;
      });
      state.splice(index[0], 1);
    },
  },
});

export const assignmentSelector = (state) => state.assignments.value;
export const { addAssignment, deleteAssignment } = assignmentSlice.actions;

export default assignmentSlice.reducer;
