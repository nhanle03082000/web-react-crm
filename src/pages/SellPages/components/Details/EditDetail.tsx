import {
  getAreasList,
  getCompanyFieldsList,
  getCustomerSourcesList,
  getDistrictsList,
  getProvincesList,
  getSaleProcessesList,
} from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { Card } from '@app/components/common/Card/Card';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
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
}

const EditDetail: React.FC<Iprops> = ({ setIsEdit, data }) => {
  const [form] = Form.useForm();
  const { path } = useContext(DataContext);
  const [provinces, setProvinces] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [districts, setDistricts] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [areas, setAreas] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [companyFields, setCompanyFields] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [customerSources, setCustomerSources] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [saleProcesses, setSaleProcesses] = useState<ISelectOption[]>([{ value: '', label: '' }]);

  const initialValues = {
    tax_code: data.tax_code,
    company_name: data.company_name,
    name: data.name,
    headquarters_address: data.headquarters_address,

    headquarters_email: data.headquarters_email,
    headquarters_phone: data.headquarters_phone,
    email: data.email,
    phone_number: data.phone_number,
  };

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
    async function getDistricts() {
      const dataResult = await getDistrictsList();
      setDistricts(dataResult);
    }
    async function getAreas() {
      const dataResult = await getAreasList();
      setAreas(dataResult);
    }
    async function getSaleProcesses() {
      const dataResult = await getSaleProcessesList();
      setSaleProcesses(dataResult);
    }
    getProvinces();
    getCustomerSources();
    getCompanyFields();
    getSaleProcesses();
    getDistricts();
    getAreas();
  }, []);

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
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <EditDetailStyles>
      <Form form={form} onFinish={onUpdate}>
        <Row>
          <Col span={8}>
            <H5>Mã báo giá</H5>
            <Form.Item name="code" rules={[{ required: true, message: 'Mã báo giá không được bỏ trống!' }]}>
              <Input placeholder="Nhập tên doanh nghiệp" size="small" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </EditDetailStyles>
  );
};

const EditDetailStyles = styled.div`
  h4 {
    color: var(--primary-color) !important;
  }
  .ant-modal-title {
    text-align: left;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 28px;
  }
  div {
    font-size: 16px;
    font-weight: 400;
  }
  textarea.ant-input {
    resize: none;
    transition: all 0.3s !important;
    font-size: 16px !important;
    border: none;
    ::placeholder {
      color: #ccc;
    }
    :focus {
      box-shadow: none;
    }
  }
  .button-send {
    border: none;
    margin-left: 24px;
  }
  .form-note {
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 10px;
  }
  .detail-watch {
    cursor: pointer;
    color: var(--primary-color);
    border: none;
    outline: none;
    font-size: 18px;
  }
  .button-edit {
    float: right;
    border: none;
    padding: 0;
  }
`;

export default EditDetail;
