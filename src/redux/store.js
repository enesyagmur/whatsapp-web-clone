import { configureStore } from "@reduxjs/toolkit";
import sliceCurrentUser from "./sliceCurrent";
import sliceRoomId from "./sliceRoomId";

export const store = configureStore({
  reducer: {
    user: sliceCurrentUser,
    roomId: sliceRoomId,
  },
});
