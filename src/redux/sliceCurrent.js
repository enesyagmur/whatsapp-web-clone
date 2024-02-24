import { createSlice } from "@reduxjs/toolkit";

export const sliceCurrentUser = createSlice({
  name: "user",
  initialState: {
    currentUser: [],
  },

  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { changeUser } = sliceCurrentUser.actions;
export default sliceCurrentUser.actions;
