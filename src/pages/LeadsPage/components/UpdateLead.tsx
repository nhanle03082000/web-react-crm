import { LeftOutlined } from '@ant-design/icons';
import {
  getAreasList,
  getCompanyFieldsList,
  getCustomerSourcesList,
  getDistrictsList,
  getProvincesList,
} from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { Card } from '@app/components/common/Card/Card';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import CustomLoading from '@app/components/customs/CustomLoading';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { startLoading, stopLoading } from '@app/utils/redux.util';
import { Col, Form, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

interface ISelectOption {
  value: any;
  label: string;
}

interface Iprops {
  setIsEdit: any;
  data: any;
  isEdit: boolean;
}

const UpdateLead: React.FC<Iprops> = ({ setIsEdit, isEdit, data }) => {
  const [form] = Form.useForm();
  const { path } = useContext(DataContext);
  const isLoading = useAppSelector((state) => state.app.loading);
  const dispath = useAppDispatch();
  const [provinces, setProvinces] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [districts, setDistricts] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [areas, setAreas] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [companyFields, setCompanyFields] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [customerSources, setCustomerSources] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [saleProcesses, setSaleProcesses] = useState<ISelectOption[]>([{ value: '', label: '' }]);

  useEffect(() => {
    dispath(startLoading);
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
      dispath(stopLoading);
    }
    const getSaleProcessesList = async () => {
      try {
        const respSaleProcesses: IRespApiSuccess = await apiInstance.get(
          `${API_BASE_URL}${API_URL.SALEPROCESSES}?f[0][field]=type&f[0][operator]=contain&f[0][value]=leads&page=1&limit=10&sort_direction=asc&sort_column=sale_process_index`,
        );
        const optionsSaleProcesses = respSaleProcesses.data.collection.map((item: any) => {
          return { value: item.id, label: item.name };
        });
        setSaleProcesses(optionsSaleProcesses);
      } catch (error: any) {}
    };
    if (isEdit) {
      getProvinces();
      getCustomerSources();
      getCompanyFields();
      getSaleProcessesList();
      getDistricts();
      getAreas();
    }
  }, []);

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

  const onUpdate = async (values: any) => {
    const data1 = {
      ...values,
      customer_source_id: 2,
      is_active: true,
    };
    try {
      const respUpdate: IRespApiSuccess = await apiInstance.put(`${API_BASE_URL}${path}/${data.id}`, data1);
      if (respUpdate.code === 200) {
        notificationController.success({
          message: 'Cập nhật thành công',
        });
        setIsEdit(false);
      } else {
        notificationController.error({
          message: respUpdate.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  useEffect(() => {
    const initialValues = {
      tax_code: data?.tax_code,
      company_name: data?.company_name,
      name: data?.name,
      headquarters_address: data?.headquarters_address,
      headquarters_province_id: data?.province.id,
      headquarters_district_id: data?.district.id,
      headquarters_area_id: data?.area.id,
      headquarters_email: data?.headquarters_email,
      headquarters_phone: data?.headquarters_phone,
      email: data?.email,
      phone_number: data?.phone_number,
      company_field_id: data?.company_field.id,
      customer_source_id: data?.customer_source?.id || null,
      sale_process_id: data?.sale_process?.id || null,
    };
    form.setFieldsValue(initialValues);
  }, []);

  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <Form form={form} onFinish={onUpdate}>
          <Row align={'middle'} justify={'space-between'}>
            <Col span={10}>
              <Button className="button-back" onClick={() => setIsEdit(false)}>
                <LeftOutlined />
                SỬA TIỀM NĂNG
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Card padding="1.25rem">
                <Row gutter={[4, 4]}>
                  <Col span={24}>
                    <H4>Thông tin chung</H4>
                  </Col>
                  <Col span={8}>
                    <H5>Tên DN</H5>
                    <Form.Item
                      name="company_name"
                      rules={[{ required: true, message: 'Tên doanh nghiệp không được bỏ trống!' }]}
                    >
                      <Input placeholder="Nhập tên doanh nghiệp" size="small" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <H5>Mã số thuế</H5>
                    <Form.Item name="tax_code" rules={[{ required: true, message: 'Mã số thuế không được bỏ trống!' }]}>
                      <Input placeholder="Nhập mã số thuế" size="small" disabled={true} />
                    </Form.Item>
                  </Col>
                  <Col span={8}></Col>
                  <Col span={8}>
                    <H5>Họ tên người đại diện</H5>
                    <Form.Item name="name" rules={[{ required: true, message: 'Họ tên không được bỏ trống!' }]}>
                      <Input placeholder="Nhập họ tên người đại diện" size="small" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <H5>SĐT di động</H5>
                    <Form.Item
                      name="phone_number"
                      rules={[{ max: 10, message: 'Số điện thoại phải có độ dài tối đa 10 số!' }]}
                    >
                      <Input placeholder="Nhập SĐT cá nhân" size="small" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <H5>Email cá nhân</H5>
                    <Form.Item name="email">
                      <Input placeholder="Nhập email cá nhân" size="small" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 4]} style={{ marginTop: '24px' }}>
                  <Col span={24}>
                    <H4>Thông tin tổ chức</H4>
                  </Col>
                  <Col span={8}>
                    <H5>Số điện thoại doanh nhiệp</H5>
                    <Form.Item
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
                    <H5>Email doanh nhiệp</H5>
                    <Form.Item
                      name="headquarters_email"
                      rules={[{ required: true, message: 'SĐT doanh nghiệp không được bỏ trống!' }]}
                    >
                      <Input placeholder="Nhập SĐT doanh nghiệp" size="small" />
                    </Form.Item>
                  </Col>
                  <Col span={8}></Col>
                  <Col span={8}>
                    <H5>Lĩnh vực doanh nghiệp</H5>
                    <Form.Item
                      name="company_field_id"
                      rules={[{ required: true, message: 'Lĩnh vực DN không được bỏ trống!' }]}
                    >
                      <Select options={companyFields} placeholder="Chọn lĩnh vực" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <H5>Nguồn gốc</H5>
                    <Form.Item name="customer_source_id">
                      <Select options={customerSources} placeholder="Chọn nguồn gốc" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <H5>Quy trình bán hàng</H5>
                    <Form.Item name="sale_process_id">
                      <Select options={saleProcesses} placeholder="Chọn quy trình bán hàng" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[4, 4]} style={{ marginTop: '24px' }}>
                  <Col span={24}>
                    <H4>Thông tin địa chỉ</H4>
                  </Col>
                  <Col span={8}>
                    <H5>Tỉnh/TP</H5>
                    <Form.Item name="headquarters_province_id">
                      <Select options={provinces} onChange={onChangeProvinces} placeholder="Chọn tỉnh/TP" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <H5>Quận/Huyện</H5>
                    <Form.Item name="headquarters_district_id">
                      <Select options={districts} onChange={onChangeDistricts} placeholder="Chọn quận/Huyện" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <H5>Phường/Xã</H5>
                    <Form.Item name="headquarters_area_id">
                      <Select options={areas} placeholder="Chọn phường/Xã" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <H5>Địa chỉ</H5>
                    <Form.Item
                      name="headquarters_address"
                      rules={[{ required: true, message: 'Địa chỉ trụ sở chính không được bỏ trống!' }]}
                    >
                      <Input placeholder="Nhập địa chỉ trụ sở chính" size="small" />
                    </Form.Item>
                  </Col>
                  <Col style={{ display: 'flex' }}>
                    <Form.Item>
                      <Button type="ghost" onClick={() => setIsEdit(false)}>
                        Huỷ
                      </Button>
                    </Form.Item>
                    &nbsp;
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Lưu
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default UpdateLead;
