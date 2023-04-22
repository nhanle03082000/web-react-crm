import { appActions } from '@app/store/slices/appSlice';
import { doLogout } from '@app/store/slices/authSlice';
import { store } from '@app/store/store';

export const getToken = () => {
  const state = store.getState();
  return state.auth?.token || '';
};

export const getRoleUser = (): string => {
  const state = store.getState();
  return state.auth?.permission;
};

export const signOut = (): any => {
  return store.dispatch(doLogout());
};

export const startLoading = () => {
  store.dispatch(appActions.startLoading());
};

export const stopLoading = () => {
  store.dispatch(appActions.stopLoading());
};
