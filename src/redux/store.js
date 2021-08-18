import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./dateSlice";

export const store = configureStore({
  reducer: {
    date: dateReducer,
  },
});
