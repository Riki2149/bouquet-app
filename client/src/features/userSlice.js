import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const user = localStorage.getItem("currentUser");

const initialState = {
  currentUser: user ? JSON.parse(user) : null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIn: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      axios.defaults.headers.common["authorization"] = `Bearer ${action.payload.token}`;
    },
    userOut: (state, action) => {
      state.currentUser = null;
      delete axios.defaults.headers.common["authorization"];
      localStorage.removeItem("currentUser");
    }
  } 
})

export const { userIn, userOut } = userSlice.actions;
export default userSlice.reducer;


