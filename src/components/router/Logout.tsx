import React, { useEffect } from 'react';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { Navigate } from 'react-router-dom';
import { doLogout } from '@app/store/slices/authSlice';
import { apiInstance } from '@app/api/app/api_core';
import { notificationController } from '@app/controllers/notificationController';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const signOut = async () => {
    try {
      apiInstance.post(`${API_BASE_URL}${API_URL.LOGOUT}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(doLogout());
    } catch (error: any) {
      notificationController.error({ message: error.message });
    }
  };

  useEffect(() => {
    signOut();
  }, [dispatch]);

  return <Navigate to="/auth/login" replace />;
};

export default Logout;
