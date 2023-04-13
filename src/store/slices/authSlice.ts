import { deletePermission, persistPermisstion, readPermisstion } from './../../services/localStorage.service';
import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import {
  ResetPasswordRequest,
  signUp,
  SignUpRequest,
  resetPassword,
  verifySecurityCode,
  SecurityCodePayload,
  NewPasswordData,
  setNewPassword,
} from '@app/api/auth.api';
import { setUser } from '@app/store/slices/userSlice';
import { deleteToken, deleteUser, persistToken, readToken } from '@app/services/localStorage.service';

export interface AuthSlice {
  token: string;
  permission: string;
}

const initialState: AuthSlice = {
  token: readToken(),
  permission: readPermisstion(),
};

export const setToken = createAction('user/setToken', (newToken) => {
  persistToken(newToken);

  return {
    payload: newToken,
  };
});

export const doLogin = createAsyncThunk('auth/doLogin', async (loginPayload: any, { dispatch }) => {
  dispatch(setUser(loginPayload));
  persistToken(readToken());
  persistPermisstion(loginPayload.role.permission);
  return {
    token: readToken(),
    permission: loginPayload.role.permission,
  };
});

export const doSignUp = createAsyncThunk('auth/doSignUp', async (signUpPayload: SignUpRequest) =>
  signUp(signUpPayload),
);

export const doResetPassword = createAsyncThunk(
  'auth/doResetPassword',
  async (resetPassPayload: ResetPasswordRequest) => resetPassword(resetPassPayload),
);

export const doVerifySecurityCode = createAsyncThunk(
  'auth/doVerifySecurityCode',
  async (securityCodePayload: SecurityCodePayload) => verifySecurityCode(securityCodePayload),
);

export const doSetNewPassword = createAsyncThunk('auth/doSetNewPassword', async (newPasswordData: NewPasswordData) =>
  setNewPassword(newPasswordData),
);

export const doLogout = createAsyncThunk('auth/doLogout', (payload, { dispatch }) => {
  deleteToken();
  deleteUser();
  deletePermission();
  dispatch(setUser(null));
  const url = window.location.origin;
  window.location.href = `https://sso.mobifone9.vn/cas/logout?service=${url}/loginSSO`;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.permission = action.payload.permission;
    });
    builder.addCase(doLogout.fulfilled, (state) => {
      state.token = '';
    });
  },
});

export default authSlice.reducer;
