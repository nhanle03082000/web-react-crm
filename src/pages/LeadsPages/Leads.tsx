import { apiInstance } from '@app/api/app/api_core';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { Select } from '@app/components/common/selects/Select/Select';
import CustomLoading from '@app/components/customs/CustomLoading';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { getRoleUser } from '@app/utils/redux.util';
import { Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Crud from './components/Crud';

interface ISelectOption {
  value: any;
  label: string;
}

const Leads: React.FC = () => {
  const { t } = useTranslation();
  const path = API_URL.LEAD;
  const userListPermission = JSON.parse(getRoleUser());

  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const isEditing = useAppSelector((state) => state.app.editing);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    data: {
      id: 0,
      code: '',
      description: '',
      is_active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    defaultInputValues: { code: '', description: '' },
  });

  const [provinces, setProvinces] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [districts, setDistricts] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [areas, setAreas] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [companyFields, setCompanyFields] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [customerSources, setCustomerSources] = useState<ISelectOption[]>([{ value: '', label: '' }]);

  const option = [
    {
      value: 'filter',
      label: 'Lọc theo trường',
      disabled: true,
    },
    {
      value: 'code',
      label: 'Mã',
    },
    {
      value: 'create_at',
      label: 'Ngày tạo',
    },
    {
      value: 'update_at',
      label: 'Ngày cập nhật',
    },
    {
      value: 'name',
      label: 'Tên',
    },
    {
      value: 'description',
      label: 'Mô tả',
    },
  ];

  const getProvincesList = async () => {
    try {
      const respProvinces: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}/provinces`);
      const optionsProvinces = respProvinces.data.collection.map((item: any) => {
        return { value: item.id, label: item.name };
      });
      setProvinces(optionsProvinces);
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  const getDistrictsList = async (idProvinces: string) => {
    const districtsList: { value: any; label: any }[] = [];
    try {
      const respDistricts: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}/districts`);
      respDistricts.data.collection.map((item: any) => {
        if (item.province_id === idProvinces) {
          districtsList.push({ value: item.id, label: item.name });
        }
      });
      setDistricts(districtsList);
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  const getAreasList = async (idDistricts: string) => {
    const areasList: { value: any; label: any }[] = [];
    try {
      const respDistricts: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}/areas`);
      respDistricts.data.collection.map((item: any) => {
        if (item.district_id === idDistricts) {
          areasList.push({ value: item.id, label: item.name });
        }
      });
      setAreas(areasList);
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  const getCustomerSourcesList = async () => {
    setLoading(true);
    try {
      const respCustomerSources: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.CUSTOMERSOURCES}`);
      const optionsCustomerSources = respCustomerSources.data.collection.map((item: any) => {
        return { value: item.id, label: item.name };
      });
      setCustomerSources(optionsCustomerSources);
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setLoading(false);
  };

  const getCompanyFieldsList = async () => {
    setLoading(true);
    try {
      const respCompanyFields: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${API_URL.COMPANYFIELDS}`);
      const optionsCompanyFields = respCompanyFields.data.collection.map((item: any) => {
        return { value: item.id, label: item.name };
      });
      setCompanyFields(optionsCompanyFields);
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setLoading(false);
  };

  const getDataByID = async (idData: number) => {
    setLoading(true);
    try {
      const respDataById: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}/${idData}`);
      if (respDataById.code === 200) {
        setState({
          ...state,
          data: respDataById?.data,
          defaultInputValues: {
            tax_code: respDataById?.data?.tax_code,
            company_name: respDataById?.data.company_name,
            name: respDataById?.data.name,
            headquarters_address: respDataById?.data.headquarters_address,
            headquarters_province_id: respDataById?.data.headquarters_province_id,
            headquarters_district_id: respDataById?.data.headquarters_district_id,
            headquarters_area_id: respDataById?.data.headquarters_area_id,
            headquarters_email: respDataById?.data.headquarters_email,
            headquarters_phone: respDataById?.data.headquarters_phone,
            email: respDataById?.data.email,
            phone_number: respDataById?.data.phone_number,
            company_field_id: respDataById?.data.company_field_id,
            customer_source_id: respDataById?.data.customer_source_id,
            sale_process_id: respDataById?.data.sale_process_id,
          },
        });
        getDistrictsList(respDataById?.data.headquarters_province_id);
        getAreasList(respDataById?.data.headquarters_district_id);
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getProvincesList();
  }, []);

  useEffect(() => {
    getCustomerSourcesList();
    getCompanyFieldsList();
  }, [isEditing]);

  const onChangeProvinces = (values: any) => {
    provinces.map((item: ISelectOption) => {
      if (item.value === values) {
        getDistrictsList(item.value);
      }
    });
  };

  const onChangeDistricts = (values: any) => {
    districts.map((item: ISelectOption) => {
      if (item.value === values) {
        getAreasList(item.value);
      }
    });
  };

  return (
    <>
      <PageTitle>{t('namepage.tiemnang')}</PageTitle>
      <Crud
        checkPermission={permission}
        path={path}
        option={option}
        getDataByID={getDataByID}
        state={state}
        getDataModal={''}
        namePage={t('namepage.tiemnang')}
      >
        {loading ? (
          <CustomLoading />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Họ tên"
                  rules={[{ required: true, message: 'Họ tên không được bỏ trống!' }]}
                >
                  <Input placeholder="Nhập họ tên người đại diện" size="small" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tax_code"
                  label="Mã số thuế"
                  rules={[{ required: true, message: 'Mã số thuế không được bỏ trống!' }]}
                >
                  <Input placeholder="Nhập mã số thuế" size="small" disabled={isEditing} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="phone_number" label="Số điện thoại di động">
                  <Input placeholder="Nhập SĐT cá nhân" size="small" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="headquarters_phone"
                  label="Số điện thoại tại trụ sở chính"
                  rules={[{ required: true, message: 'SĐT doanh nghiệp không được bỏ trống!' }]}
                >
                  <Input placeholder="Nhập SĐT doanh nghiệp" size="small" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="email" label="Email cá nhân">
                  <Input placeholder="Nhập email cá nhân" size="small" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="headquarters_email"
                  label="Email doanh nghiệp"
                  rules={[
                    { required: true, message: 'Email doanh nghiệp không được bỏ trống!' },
                    { type: 'email', message: 'Email không hợp lệ' },
                  ]}
                >
                  <Input placeholder="Nhập email doanh nghiệp" size="small" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item
                  name="company_name"
                  label="Tên doanh nghiệp"
                  rules={[{ required: true, message: 'Tên doanh nghiệp không được bỏ trống!' }]}
                >
                  <Input placeholder="Nhập tên doanh nghiệp" size="small" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="headquarters_address"
                  label="Địa chỉ trụ sở chính"
                  rules={[{ required: true, message: 'Địa chỉ trụ sở chính không được bỏ trống!' }]}
                >
                  <Input placeholder="Nhập địa chỉ trụ sở chính" size="small" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="customer_source_id" label="Nguồn gốc">
                  <Select options={customerSources} placeholder="Chọn nguồn gốc" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="company_field_id"
                  label="Lĩnh vực"
                  rules={[{ required: true, message: 'Lĩnh vực DN không được bỏ trống!' }]}
                >
                  <Select options={companyFields} placeholder="Chọn lĩnh vực" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item name="headquarters_province_id" label="Tỉnh/TP">
                  <Select options={provinces} onChange={onChangeProvinces} placeholder="Chọn tỉnh/TP" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="headquarters_district_id" label="Quận/Huyện">
                  <Select options={districts} onChange={onChangeDistricts} placeholder="Chọn quận/Huyện" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="headquarters_area_id" label="Phường/Xã">
                  <Select options={areas} placeholder="Chọn phường/Xã" />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
      </Crud>
    </>
  );
};

export default Leads;
