import { createSelector, createSlice } from '@reduxjs/toolkit';

const sliceName = 'app';
const initialState = {
  loading: false,
  dataTable: [],
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
    getDataTable: (state, action) => {
      state.dataTable = action.payload;
    },
  },
});

const appState = (state: any) => state[sliceName];
export const appSelector = {
  loading: createSelector(appState, (app) => app.loading),
  dataTable: createSelector(appState, (app) => app.dataTable),
};
export const appActions = appSlice.actions;
export default appSlice.reducer;
