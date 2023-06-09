import { getCompanyFieldsList, getCustomerSourcesList, getProvincesList } from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Col, Form, Row } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  isEditing: boolean;
}

interface ISelectOption {
  value: any;
  label: string;
}

const CustomersForm: React.FC<IProps> = ({ isEditing }) => {
  const [provinces, setProvinces] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [districts, setDistricts] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [areas, setAreas] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [companyFields, setCompanyFields] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [customerSources, setCustomerSources] = useState<ISelectOption[]>([{ value: '', label: '' }]);

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

  useEffect(() => {
    async function getCustomerSources() {
      const dataResult = await getCustomerSourcesList();
      setCustomerSources(dataResult);
    }
    async function getCompanyFields() {
      const dataResult = await getCompanyFieldsList();
      setCompanyFields(dataResult);
    }
    async function getProvinces() {
      const dataResult = await getProvincesList();
      setProvinces(dataResult);
    }
    getProvinces();
    getCustomerSources();
    getCompanyFields();
  }, [isEditing]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item name="name" label="Họ tên" rules={[{ required: true, message: 'Họ tên không được bỏ trống!' }]}>
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
          <Form.Item
            name="customer_source_id"
            label="Nguồn gốc"
            rules={[{ required: true, message: 'Nguồn gốc không được bỏ trống!' }]}
          >
            <Select options={customerSources} placeholder="Chọn nguồn gốc" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="company_field_id"
            label="Lĩnh vực"
            rules={[{ required: true, message: 'Lĩnh vực không được bỏ trống!' }]}
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
  );
};

export default CustomersForm;
