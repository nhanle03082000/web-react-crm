import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { apiInstance } from './api_core';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';

export const getCustomerSourcesList = async () => {
  try {
    const respCustomerSources: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.CUSTOMERSOURCES}`);
    const optionsCustomerSources = respCustomerSources.data.collection.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    return optionsCustomerSources;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};

export const getCompanyFieldsList = async () => {
  try {
    const respCompanyFields: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.COMPANYFIELDS}`);
    const optionsCompanyFields = respCompanyFields.data.collection.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    return optionsCompanyFields;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};

export const getCompanyCareerList = async () => {
  try {
    const respCompanyCareer: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.COMPANYCAREERS}`);
    const optionsCompanyCareer = respCompanyCareer.data.collection.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    return optionsCompanyCareer;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};

export const getCompanyTypesList = async () => {
  try {
    const respCompanyTypes: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.COMPANYTYPES}`);
    const optionsCompanyTypes = respCompanyTypes.data.collection.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    return optionsCompanyTypes;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};

export const getSaleProcessesList = async () => {
  try {
    const respSaleProcesses: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.SALEPROCESSES}`);
    const optionsSaleProcesses = respSaleProcesses.data.collection.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    return optionsSaleProcesses;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};

export const getUsersList = async () => {
  try {
    const respUsers: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.USERS}`);
    const optionsUsers = respUsers.data.collection.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    return optionsUsers;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};

export const getCustomersList = async () => {
  try {
    const respUsers: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.CUSTOMER}`);
    const optionsUsers = respUsers.data.collection.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    return optionsUsers;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};

export const getProductGroupList = async () => {
  try {
    const respProductGroup: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.PRODUCTGROUPS}`);
    const optionsProductGroup = respProductGroup.data.collection.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    return optionsProductGroup;
  } catch (error: any) {
    notificationController.error({
      message: 'Có lỗi xảy ra vui lòng thử lại sau',
      description: error.message,
    });
  }
};