import { apiInstance } from '@app/api/app/api_core';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';

export const getAreasList = async (idDistricts: string) => {
  const areasList: { value: any; label: any }[] = [];
  try {
    const respDistricts: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}/areas`);
    respDistricts.data.collection.map((item: any) => {
      if (item.district_id === idDistricts) {
        areasList.push({ value: item.id, label: item.name });
      }
    });
    return areasList;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};
