import { doLogout } from '@app/store/slices/authSlice';
import { store } from '@app/store/store';

export const getToken = (): string => {
  const state = store.getState();
  return state.auth?.token;
};

export const getRoleUser = (): string => {
  const state = store.getState();
  return state.auth?.permission;
};

export const signOut = (): any => {
  return store.dispatch(doLogout());
};
