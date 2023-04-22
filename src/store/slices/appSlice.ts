import { createSelector, createSlice } from '@reduxjs/toolkit';

const sliceName = 'app';
const initialState = {
  loading: false,
};

const appSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
  },
});

// ===========================================================
// >>>> FOR EXPORTS <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ===========================================================
const appState = (state: any) => state[sliceName];
export const appSelector = {
  loading: createSelector(appState, (app) => app.loading),
};
export const appActions = appSlice.actions;
export default appSlice.reducer;
