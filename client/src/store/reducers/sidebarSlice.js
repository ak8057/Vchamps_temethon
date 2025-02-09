// src/store/reducers/sidebarSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapse: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.collapse = !state.collapse;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
