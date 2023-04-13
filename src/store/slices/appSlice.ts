import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editing: false,
  permission: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startEditing(state, action) {
      state.editing = action.payload;
    },
    savePermisstion(state, action) {
      state.permission = action.payload;
    },
  },
});

export const { startEditing, savePermisstion } = appSlice.actions;
export default appSlice.reducer;
