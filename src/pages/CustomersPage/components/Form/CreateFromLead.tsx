import {
  getAreasList,
  getCompanyCareerList,
  getCompanyFieldsList,
  getCompanyTypesList,
  getCustomerSourcesList,
  getDistrictsList,
  getProvincesList,
} from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { Modal } from '@app/components/common/Modal/Modal';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Select } from '@app/components/common/selects/Select/Select';
import { H4 } from '@app/components/common/typography/H4/H4';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Col, Form, Input, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ISelectOption {
  value: any;
  label: string;
}

interface IProps {
  titleButton?: string;
  defaultValues?: any;
}

const CreateFromLead: React.FC<IProps> = ({ titleButton, defaultValues }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { page, show, setShow } = useContext(DataContext);
  const path = '/customers';
  const [provinces, setProvinces] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [districts, setDistricts] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [areas, setAreas] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [companyFields, setCompanyFields] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [customerSources, setCustomerSources] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [CompanyCareer, setCompanyCareer] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [CompanyTypes, setCompanyTypes] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [saleProcesses, setSaleProcesses] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const navigate = useNavigate();

  const onChangeProvinces = (values: any) => {
    provinces.map((item: ISelectOption) => {
      if (item.value === values) {
        getDistrictList(item.value);
      }
    });
  };

  const onChangeDistricts = (values: any) => {
    districts.map((item: ISelectOption) => {
      if (item.value === values) {
        getAreaList(item.value);
      }
    });
  };

  const getDistrictList = async (idProvinces: string) => {
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

  const getAreaList = async (idDistricts: string) => {
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

  async function getCompanyTypes() {
    const dataResult = await getCompanyTypesList();
    setCompanyTypes(dataResult);
  }
  async function getCompanyCareer() {
    const dataResult = await getCompanyCareerList();
    setCompanyCareer(dataResult);
  }
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
  async function getDistricts() {
    const dataResult = await getDistrictsList();
    setDistricts(dataResult);
  }
  async function getAreas() {
    const dataResult = await getAreasList();
    setAreas(dataResult);
  }
  const getSaleProcessesList = async () => {
    try {
      const respSaleProcesses: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}${API_URL.SALEPROCESSES}?f[0][field]=type&f[0][operator]=contain&f[0][value]=customers&page=1&limit=10&sort_direction=asc&sort_column=sale_process_index`,
      );
      const optionsSaleProcesses = respSaleProcesses.data.collection.map((item: any) => {
        return { value: item.id, label: item.name };
      });
      setSaleProcesses(optionsSaleProcesses);
    } catch (error: any) {}
  };

  const showModal = () => {
    setIsModalOpen(true);
    getProvinces();
    getCustomerSources();
    getCompanyFields();
    getDistricts();
    getAreas();
    getCompanyCareer();
    getCompanyTypes();
    getSaleProcessesList();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onDeleteById = async (path: string, id: number) => {
    try {
      await apiInstance.delete(`${API_BASE_URL}/${path}/${id}`);
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  const onCreate = async (values: any) => {
    const data = {
      ...values,
      is_active: true,
    };
    try {
      const respUsers: IRespApiSuccess = await apiInstance.post(`${API_BASE_URL}${path}`, data);
      if (respUsers.code === 200) {
        notificationController.success({
          message: 'Tạo thành công',
        });
        onDeleteById('leads', defaultValues.id);
        navigate(`/customers/${respUsers.data?.id}`);
      } else {
        notificationController.error({
          message: respUsers.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setShow(!show);
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const initValues = {
      ...defaultValues,
      customer_source_id: defaultValues?.customer_source?.id,
      company_field_id: defaultValues?.company_field?.id,
      sale_process_id: null,
      headquarters_province_id: defaultValues?.province?.id,
      headquarters_district_id: defaultValues?.district?.id,
      headquarters_area_id: defaultValues?.area?.id,
    };
    form.setFieldsValue(initValues);
  }, [isModalOpen]);

  return (
    <CreateStyles>
      <Button className="button-create" onClick={showModal} type="primary">
        {titleButton ? titleButton : `Thêm ${page}`}
      </Button>
      <Modal
        title={`Thêm khách hàng`}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        size="large"
        footer={null}
      >
        <Form form={form} onFinish={onCreate} layout="vertical">
          <Row>
            <Col span={24}>
              <Row gutter={[10, 0]}>
                <Col span={24}>
                  <H4 className="uppercase">Thông tin tổ chức</H4>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Tên doanh nghiệp"
                    name="company_name"
                    rules={[{ required: true, message: 'Tên doanh nghiệp không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập tên doanh nghiệp" size="small" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="tax_code"
                    label="Mã số thuế"
                    rules={[{ required: true, message: 'Mã số thuế không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập mã số thuế" size="small" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="company_field_id"
                    label="Lĩnh vực"
                    rules={[{ required: true, message: 'Lĩnh vực DN không được bỏ trống!' }]}
                  >
                    <Select options={companyFields} placeholder="Chọn lĩnh vực" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="SĐT doanh nghiệp"
                    name="headquarters_phone"
                    rules={[
                      { required: true, message: 'SĐT doanh nghiệp không được bỏ trống!' },
                      { max: 10, message: 'Số điện thoại phải có độ dài tối đa 10 số!' },
                    ]}
                  >
                    <Input placeholder="Nhập SĐT doanh nghiệp" size="small" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Email doanh nghiệp"
                    name="headquarters_email"
                    rules={[{ required: true, message: 'Email doanh nghiệp không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập email doanh nghiệp" size="small" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="customer_source_id"
                    label="Nguồn gốc"
                    rules={[{ required: true, message: 'Nguồn gốc không được bỏ trống!' }]}
                  >
                    <Select options={customerSources} placeholder="Chọn nguồn gốc" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="company_career_id"
                    label="Danh mục ngành nghề"
                    rules={[{ required: true, message: 'Ngành nghề không được bỏ trống!' }]}
                  >
                    <Select options={CompanyCareer} placeholder="Chọn ngành nghề" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="sale_process_id" label="Quy trình bán hàng">
                    <Select options={saleProcesses} placeholder="Chọn quy trình bán hàng" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="company_type_id"
                    label="Loại hình"
                    rules={[{ required: true, message: 'Loại hình không được bỏ trống!' }]}
                  >
                    <Select options={CompanyTypes} placeholder="Chọn loại hình" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="headquarters_province_id"
                    label="Tỉnh/TP"
                    rules={[{ required: true, message: 'Tỉnh/TP không được bỏ trống!' }]}
                  >
                    <Select options={provinces} onChange={onChangeProvinces} placeholder="Chọn tỉnh/TP" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="headquarters_district_id"
                    label="Quận/Huyện"
                    rules={[{ required: true, message: 'Quận/Huyện không được bỏ trống!' }]}
                  >
                    <Select options={districts} onChange={onChangeDistricts} placeholder="Chọn quận/Huyện" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="headquarters_area_id"
                    label="Phường/Xã"
                    rules={[{ required: true, message: 'Phường/Xã không được bỏ trống!' }]}
                  >
                    <Select options={areas} placeholder="Chọn phường/Xã" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Địa chỉ trụ sở chính"
                    name="headquarters_address"
                    rules={[{ required: true, message: 'Địa chỉ trụ sở chính không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập số nhà, đường" size="small" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[12, 0]}>
                <Col span={24}>
                  <H4 className="uppercase">Thông tin cá nhân</H4>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="name"
                    label="Họ tên người đại diện"
                    rules={[{ required: true, message: 'Họ tên không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập họ tên người đại diện" size="small" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="SĐT người đại diện"
                    name="phone_number"
                    rules={[{ max: 10, message: 'SĐT phải có độ dài tối đa 10 số!' }]}
                  >
                    <Input placeholder="Nhập SĐT người đại diện" size="small" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="email" label="Email người đại diện">
                    <Input placeholder="Nhập email người đại diện" size="small" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="start">
                <Button size="small" type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </CreateStyles>
  );
};

const CreateStyles = styled.div`
  .ant-modal-title {
    text-align: left;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 28px;
  }
`;

export default CreateFromLead;
