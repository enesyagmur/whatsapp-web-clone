import { configureStore } from "@reduxjs/toolkit";
import sliceRoom from "./sliceRoom";

export const store = configureStore({
  reducer: {
    roomId: sliceRoom,
  },
});
