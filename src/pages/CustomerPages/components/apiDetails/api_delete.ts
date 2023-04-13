import { apiInstance } from '@app/api/app/api_core';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';

export const onDeleteById = async (id: number) => {
  try {
    const respUsers: IRespApiSuccess = await apiInstance.delete(`${API_BASE_URL}/leads/${id}`);
    if (respUsers.code === 200) {
      notificationController.success({
        message: 'Xoá thành công',
      });
    }
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};
