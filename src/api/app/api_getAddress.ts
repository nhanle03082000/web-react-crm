import { API_BASE_URL } from '@app/configs/api-configs';
import { apiInstance } from './api_core';
import { notificationController } from '@app/controllers/notificationController';

export const getAddress = async (id: number, path: string) => {
  try {
    const resp: any = await apiInstance.get(`${API_BASE_URL}/${path}`);
    let data = {};
    if (resp.code === 200) {
      resp.data.collection.map((item: any) => {
        if (item.id === id) {
          return (data = item);
        }
      });
    }
    return data;
  } catch (error: any) {
    notificationController.error({ message: error.message });
  }
};
