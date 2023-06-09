import { getCustomersList } from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { DatePicker } from '@app/components/common/pickers/DatePicker';
import { Select } from '@app/components/common/selects/Select/Select';
import { H4 } from '@app/components/common/typography/H4/H4';
import CustomLoading from '@app/components/customs/CustomLoading';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Col, Form, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ISelectOption {
  value: any;
  label: string;
}

interface Iprops {
  setIsEdit: any;
  data: any;
  amount: any;
  children: React.ReactNode;
}

const EditDetail: React.FC<Iprops> = ({ setIsEdit, data, amount, children }) => {
  const [form] = Form.useForm();
  const path = '/quotes';
  const [customers, setCustomers] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    code: data.code,
    quote_date: moment(data.quote_date),
    company_name: data.company_name,
    customer_id: data.customer.id,
    tax_code: data.tax_code,
    email: data.email,
    phone_number: data.phone_number,
    employee_id: data.employee_id,
    phone: data.employee?.phone,
    total_amount: data.total_amount,
    total_before_tax: data.total_before_tax,
    total_tax_amount: data.total_tax_amount,
  };

  useEffect(() => {
    async function getCustomer() {
      const dataResult = await getCustomersList();
      setCustomers(dataResult);
    }

    getCustomer();
  }, []);

  const onUpdate = async (values: any) => {
    setIsLoading(true);
    for (let i = 0; i < values.detail.length; i++) {
      delete values.detail[i].sum_vat;
    }
    const data1 = {
      ...values,
      quote_date: moment(new Date(values.quote_date).toUTCString()).format('YYYY-MM-DD'),
      total_tax_amount: amount.tax,
      total_before_tax: amount.before_tax,
      total_amount: amount.after_tax,
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
    setIsLoading(false);
  };

  const onChangeCustomer = (value: any) => {
    const itemCus = customers.find((item) => {
      if (item.value === value) return item;
    });
    form.setFieldsValue(itemCus);
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <EditDetailStyles>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <Form form={form} onFinish={onUpdate} layout="vertical">
          <Row>
            <Col span={24}>
              <Row gutter={10}>
                <Col span={24}>
                  {/* <Form.Item
                    label="Mã báo giá"
                    name="code"
                    rules={[{ required: true, message: 'Mã báo giá không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập tên doanh nghiệp" size="small" disabled />
                  </Form.Item> */}
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Khách hàng"
                    name="customer_id"
                    rules={[{ required: true, message: 'Khách hàng không được bỏ trống!' }]}
                  >
                    <Select
                      options={customers}
                      placeholder="Chọn khách hàng"
                      size="small"
                      onChange={(value) => onChangeCustomer(value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Ngày báo giá"
                    name="quote_date"
                    rules={[{ required: true, message: 'Mã báo giá không được bỏ trống!' }]}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="Chọn ngày báo giá"
                      size="small"
                      disabled
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tên doanh nghiệp"
                    name="company_name"
                    rules={[{ required: true, message: 'Tên doanh nghiệp không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập tên doanh nghiệp" size="small" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Mã số thuế"
                    name="tax_code"
                    rules={[{ required: true, message: 'Mã số thuê không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập mã số thuê" size="small" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email khách hàng"
                    name="email"
                    rules={[{ required: true, message: 'Email khách hàng không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập email khách hàng" size="small" disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Số điện thoại khách hàng"
                    name="phone_number"
                    rules={[
                      { required: true, message: 'Số điện thoại khách hàng không được bỏ trống!' },
                      { len: 10, message: 'Số điện thoại phải có 10 số!' },
                    ]}
                  >
                    <Input placeholder="Nhập số điện thoại khách hàng" size="small" disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <br />
                  <H4>Thông tin sản phẩm</H4>
                </Col>
                <Col span={24}>{children}</Col>
                <Col style={{ display: 'flex', marginTop: '20px' }}>
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
            </Col>
          </Row>
        </Form>
      )}
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
