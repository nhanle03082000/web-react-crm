import React from 'react';
import { Navigate } from 'react-router-dom';
import { WithChildrenProps } from '@app/types/generalTypes';
import { getToken } from '@app/utils/redux.util';

const RequireAuth: React.FC<WithChildrenProps> = ({ children }) => {
  const token = getToken();

  return token ? <>{children}</> : <Navigate to="/auth/login" replace />;
};

export default RequireAuth;
