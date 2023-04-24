import userReducer from '@app/store/slices/userSlice';
import authReducer from '@app/store/slices/authSlice';
import themeReducer from '@app/store/slices/themeSlice';
import pwaReducer from '@app/store/slices/pwaSlice';
import appReducer from '@app/store/slices/appSlice';
import columnReducer from '@app/store/slices/columnSlice';

export default {
  user: userReducer,
  auth: authReducer,
  theme: themeReducer,
  pwa: pwaReducer,
  app: appReducer,
  col: columnReducer,
};
