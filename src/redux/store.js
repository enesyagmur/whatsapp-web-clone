import { configureStore } from "@reduxjs/toolkit";
import sliceCurrentUser from "./sliceCurrent";
import sliceRoom from "./sliceRoom";

export const store = configureStore({
  reducer: {
    user: sliceCurrentUser,
    roomId: sliceRoom,
  },
});
