import { apiInstance } from '@app/api/app/api_core';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';

export const getDistrictsList = async (idProvinces: string) => {
  const districtsList: { value: any; label: any }[] = [];
  try {
    const respDistricts: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}/districts`);
    respDistricts.data.collection.map((item: any) => {
      if (item.province_id === idProvinces) {
        districtsList.push({ value: item.id, label: item.name });
      }
    });
    return districtsList;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};
