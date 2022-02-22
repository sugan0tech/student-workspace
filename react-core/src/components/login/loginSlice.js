import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";
import qs from "qs";

export const getUser = createAsyncThunk("/user/getUsers", async (user) => {
  const response = await axios.post("/register", qs.stringify(user));
  console.log(response);
  return response.data;
});

export const getUserLogin = createAsyncThunk("/user/getUsers", async (user) => {
  const response = await axios.post("/login", qs.stringify(user));
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
