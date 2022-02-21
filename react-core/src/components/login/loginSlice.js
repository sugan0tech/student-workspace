import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const getUser = createAsyncThunk("/user/getUsers", async (user) => {
  const response = await axios.post("/authaccount/registration", user);
  console.log(response);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    status: "",
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload.data;
      state.status = "sucess";
    },
    [getUser.rejected]: (state, payload) => {
      state.status = "failed";
    },
  },
});

export default userSlice.reducer;
