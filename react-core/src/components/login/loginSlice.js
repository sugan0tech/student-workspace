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
  // console.log(response);
  // console.log("response over: ");
  // const data = await response.json();

  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    exists: false,
  },
  extraReducers: {
    [getUser.fulfilled]: (state) => {
      state.exists = true;
    },
    [getUserLogin.fulfilled]: (state) => {
      state.exists = true;
    },
  },
});

export default userSlice.reducer;
