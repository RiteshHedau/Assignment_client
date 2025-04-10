import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      name: null,
      email: null,
      role: null,
      id: null,
      profilePic: null,
    },
    allUsers: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setUser, setAllUsers } = userSlice.actions;
export default userSlice.reducer;
