import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
export const getAssignments = createAsyncThunk(
  "/assignments/getAssignments",
  async (assignments) => {
    const response = await axios.post("/api/getAssignments", assignments);

    // console.log(response);
    console.log("get assignment", response.data);
    return response.data;
  }
);

export const addAssignment = createAsyncThunk(
  "/assignments/addAssignment",
  async (assignment) => {
    const response = await axios.post("/api/addAssignment", assignment);
    console.log(response);
    return response.data;
  }
);
const assignmentSlice = createSlice({
  name: "assignments",
  initialState: [],
  reducers: {
    // addAssignment: (state, action) => {
    //   state.push(action.payload);
    // },
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
      let index = 0;
      state.map((assignment, idx) => {
        if (id === assignment.id) {
          console.log("detected");
          index = idx;
        }
        return true;
      });

      state.splice(index, 1);
    },
  },
  extraReducers: {
    [getAssignments.fulfilled]: (state, { payload }) => {
      // return payload.filter((ele) => (ele ? true : false));
      console.log(payload);
    },
    [addAssignment.fulfilled]: (state, { payload }) => {
      console.log("added assignment : ");
      console.log(payload);
    },
  },
});

export const assignmentSelector = (state) => state.assignments;
export const { deleteAssignment, changeIsComplete } = assignmentSlice.actions;

export default assignmentSlice.reducer;
