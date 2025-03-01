import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../utils/commonFunctions";

const initialState = {
  date: formatDate(new Date("2021-10-31")),
};

export const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    changeDate: (state, action) => {
      state.date = action.payload;
    },
    resetDate: (state) => {
      state.date = new Date();
    },
  },
});

export const { changeDate, resetDate } = dateSlice.actions;

export const selectDate = (state) => state.date.date;

export default dateSlice.reducer;
