import { API_BASE_URL } from '@app/configs/api-configs';
import { apiInstance } from './api_core';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { notificationController } from '@app/controllers/notificationController';

export const getDataById = async (id: number, path: string) => {
  try {
    const resp: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}/${id}`);
    if (resp.code === 200) {
      return resp.data;
    }
  } catch (error: any) {
    notificationController.error({ message: error.message });
  }
};
