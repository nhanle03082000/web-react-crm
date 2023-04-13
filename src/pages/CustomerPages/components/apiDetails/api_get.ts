import { notificationController } from '@app/controllers/notificationController';
import { apiInstance } from '@app/api/app/api_core';
import { API_BASE_URL } from '@app/configs/api-configs';
import { IRespApiSuccess } from '@app/interfaces/interfaces';

export const getListNote = async (id: number) => {
  try {
    const respUsers: IRespApiSuccess = await apiInstance.get(
      `${API_BASE_URL}/customer_notes?f[0][field]=customer_id&f[0][operator]=contain&f[0][value]=${id}`,
    );
    if (respUsers.code === 200) {
      return respUsers.data.collection;
    }
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};
