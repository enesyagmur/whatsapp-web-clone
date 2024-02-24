import { configureStore } from "@reduxjs/toolkit";
import sliceCurrentUser from "./slice";

export const store = configureStore({
  reducer: {
    user: sliceCurrentUser,
  },
});
