import { createSlice } from "@reduxjs/toolkit";

export const sliceCurrentUser = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { changeUser } = sliceCurrentUser.actions;
