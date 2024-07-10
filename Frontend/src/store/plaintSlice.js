import { createSlice } from "@reduxjs/toolkit";

const init = {
  plaintId: null,
};
const plaintSlice = createSlice({
  name: "plaint",
  initialState: init,
  reducers: {
    setPlaintId(state, action) {
      const id = action.payload;
      state.plaintId = id;
    },
  },
});

export const { setPlaintId } = plaintSlice.actions;
export default plaintSlice;
