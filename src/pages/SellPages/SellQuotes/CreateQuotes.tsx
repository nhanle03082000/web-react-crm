import { LeftOutlined, RestOutlined } from '@ant-design/icons';
import { getCustomersList, getProductList, getUsersList } from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { DatePicker } from '@app/components/common/pickers/DatePicker';
import { API_URL } from '@app/configs/api-configs';
import { Select } from '@app/components/common/selects/Select/Select';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Card, Col, Form, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ISelectOption {
  value: any;
  label: string;
}

const CreateQuotes: React.FC = () => {
  const [form] = Form.useForm();
  const path = API_URL.QUOTES;
  const [customers, setCustomers] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [user, setUser] = useState<ISelectOption[]>([{ value: '', label: '' }]);
  const [optionProduct, setOptionProduct] = useState<any>([]);
  const [product, setProduct] = useState([]);
  const [dataRow, setdataRow] = useState<any>([]);
  const [formUpdateCount, setFormUpdateCount] = useState(0);

  useEffect(() => {
    async function getProduct() {
      const productList = await getProductList();
      const options = productList.map((item: any) => {
        return { value: item.id, label: item.name };
      });
      setOptionProduct(options);
      setProduct(productList);
    }
    async function getCustomer() {
      const dataResult = await getCustomersList();
      setCustomers(dataResult);
    }
    async function getUsers() {
      const dataResult = await getUsersList();
      setUser(dataResult);
    }
    getCustomer();
    getUsers();
    getProduct();
  }, []);

  const onCreate = async (values: any) => {
    const data1 = {
      ...values,
      quote_date: moment(new Date(values.quote_date).toUTCString()).format('YYYY-MM-DD'),
    };
    console.log(data1);
    // try {
    //   const respUpdate: IRespApiSuccess = await apiInstance.put(`${API_BASE_URL}${path}`, data1);
    //   if (respUpdate.code === 200) {
    //     notificationController.success({
    //       message: 'Tạo thành công',
    //     });
    //   } else {
    //     notificationController.error({
    //       message: respUpdate.message,
    //     });
    //   }
    // } catch (error: any) {
    //   notificationController.error({
    //     message: 'Có lỗi xảy ra vui lòng thử lại sau',
    //     description: error.message,
    //   });
    // }
  };

  const onChangeSelect = (value: any, index: number, name: string) => {
    const dataChange: any = product.find((item: any) => {
      return item.id === value;
    });
    console.log(name);
    console.log(dataChange);
    form.setFieldsValue({
      [`${name}.price`]: dataChange?.description || 0,
      [`${name}.vat`]: 0,
      [`${name}.amount_before_tax`]: 0,
      [`${name}.amount`]: 0,
    });
    // console.log(form);
    // dataRow[index] = dataChange;
    // setdataRow([...dataRow]);
    // setFormUpdateCount(formUpdateCount + 1);
  };

  console.log('render');

  return (
    <EditDetailStyles>
      <Form form={form} onFinish={onCreate}>
        <Row>
          <Col span={24}>
            <Button
              className="button-back"
              // onClick={onBack}
            >
              <LeftOutlined /> TẠO BÁO GIÁ
            </Button>
          </Col>
          <Col span={24}>
            <Card>
              {/* <Row gutter={10}>
                <Col span={12}>
                  <H5>Mã báo giá</H5>
                  <Form.Item name="code" rules={[{ required: true, message: 'Mã báo giá không được bỏ trống!' }]}>
                    <Input placeholder="Nhập tên doanh nghiệp" size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Ngày báo giá</H5>
                  <Form.Item name="quote_date" rules={[{ required: true, message: 'Mã báo giá không được bỏ trống!' }]}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      placeholder="Chọn ngày báo giá"
                      size="small"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Tên doanh nghiệp</H5>
                  <Form.Item
                    name="company_name"
                    rules={[{ required: true, message: 'Tên doanh nghiệp không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập tên doanh nghiệp" size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Khách hàng</H5>
                  <Form.Item
                    name="customer_id"
                    rules={[{ required: true, message: 'Khách hàng không được bỏ trống!' }]}
                  >
                    <Select options={customers} placeholder="Chọn khách hàng" size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Mã số thuế</H5>
                  <Form.Item name="tax_code" rules={[{ required: true, message: 'Mã số thuê không được bỏ trống!' }]}>
                    <Input placeholder="Nhập mã số thuê" size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Email khách hàng</H5>
                  <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Email khách hàng không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập email khách hàng" size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Số điện thoại khách hàng</H5>
                  <Form.Item
                    name="phone_number"
                    rules={[{ required: true, message: 'Số điện thoại khách hàng không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập số điện thoại khách hàng" size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Nhân viên phụ trách</H5>
                  <Form.Item
                    name="employee_id"
                    rules={[{ required: true, message: 'Nhân viên phụ trách không được bỏ trống!' }]}
                  >
                    <Select options={user} placeholder="Chọn nhân viên phụ trách" size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Số điện thoại nhân viên</H5>
                  <Form.Item
                    name="phone"
                    rules={[{ required: true, message: 'Số điện thoại nhân viên không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập số điện thoại nhân viên" size="small" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <H5>Tổng cộng</H5>
                  <Form.Item
                    name="total_amount"
                    rules={[{ required: true, message: 'Tổng cộng không được bỏ trống!' }]}
                  >
                    <Input placeholder="Nhập tổng cộng" size="small" />
                  </Form.Item>
                </Col>
              </Row> */}
              <Row>
                <Col span={24}>
                  <br />
                  <H4>Thông tin sản phẩm</H4>
                  <Form.List name="detail" initialValue={[{}]} key={formUpdateCount}>
                    {(quote_detail, { add, remove }) => {
                      return (
                        <>
                          <Button onClick={add}>Thêm</Button>
                          <Row gutter={10}>
                            <Col span={4}>
                              <H5>Sản phẩm</H5>
                            </Col>
                            <Col span={4}>
                              <H5>Số lượng</H5>
                            </Col>
                            <Col span={4}>
                              <H5>Đơn giá</H5>
                            </Col>
                            <Col span={4}>
                              <H5>Vat%</H5>
                            </Col>
                            <Col span={4}>
                              <H5>Thành tiền trước thuế</H5>
                            </Col>
                            <Col span={3}>
                              <H5>Thành tiền</H5>
                            </Col>
                            <Col span={1}>
                              <H5>Xoá</H5>
                            </Col>
                          </Row>
                          {quote_detail.map(({ key, name, ...restField }: any, index) => {
                            return (
                              <Row key={key} gutter={10} style={{ marginBottom: '10px' }}>
                                <Col span={4}>
                                  <Form.Item
                                    name={[name, 'product_id']}
                                    rules={[{ required: true, message: 'error' }]}
                                    {...restField}
                                  >
                                    <Select
                                      options={optionProduct}
                                      placeholder="Chọn sản phẩm"
                                      style={{ width: '100%' }}
                                      onChange={(value) => {
                                        onChangeSelect(value, index, 'detail');
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Form.Item
                                    name={[name, 'quantity']}
                                    rules={[{ required: true, message: 'Thong loi o day' }]}
                                    {...restField}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Form.Item
                                    name={[name, 'price']}
                                    rules={[{ required: true, message: 'Thong loi o day' }]}
                                    {...restField}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Form.Item
                                    name={[name, 'vat']}
                                    rules={[{ required: true, message: 'Thong loi o day' }]}
                                    {...restField}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col span={4}>
                                  <Form.Item
                                    name={[name, 'amount_before_tax']}
                                    rules={[{ required: true, message: 'Thong loi o day' }]}
                                    {...restField}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col span={3}>
                                  <Form.Item
                                    name={[name, 'amount']}
                                    rules={[{ required: true, message: 'Thong loi o day' }]}
                                    {...restField}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                <Col span={1}>
                                  <RestOutlined
                                    onClick={() => remove(name)}
                                    style={{ color: '#ff4d4f', fontSize: '24px', marginTop: '4px' }}
                                  />
                                </Col>
                                &nbsp;
                              </Row>
                            );
                          })}
                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Lưu
                            </Button>
                          </Form.Item>
                        </>
                      );
                    }}
                  </Form.List>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </EditDetailStyles>
  );
};

const MyInput = (props: { initValue: string; disabled?: boolean }) => {
  const [value, setValue] = useState(props.initValue);
  const onChange1 = (evt: any) => {
    setValue(evt.target.value);
  };
  useEffect(() => {
    setValue(props.initValue);
  }, [props.initValue]);

  return <Input value={value} onChange={onChange1} disabled={props.disabled} />;
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

export default CreateQuotes;
