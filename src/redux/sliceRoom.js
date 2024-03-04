import { createSlice } from "@reduxjs/toolkit";

export const roomIdSlice = createSlice({
  name: "roomId",
  initialState: {
    id: "",
  },

  reducers: {
    changeId: (state, action) => {
      state.id = action.payload;
    },
  },
});
export const { changeId } = roomIdSlice.actions;
export default roomIdSlice.reducer;
