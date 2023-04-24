import { LeftOutlined } from '@ant-design/icons';
import { getCustomersList, getProductList } from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import CustomLoading from '@app/components/customs/CustomLoading';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { maxValueRule, minValueRule } from '@app/utils/utils';
import { Card, Col, DatePicker, Form, InputNumber, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuotes: React.FC = () => {
  const [form] = Form.useForm();
  const path = API_URL.QUOTES;
  const defaultDetail = {
    stt: 1,
    product_id: null,
    quantity: 1,
    price: 1000,
    vat: 0,
    amount_before_tax: 0,
    amount: 0,
  };
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<any[]>([]);
  const [optionProduct, setOptionProduct] = useState<any>([]);
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newArr, setNewArr] = useState<any[]>([defaultDetail]);
  const [amount, setAmount] = useState<any>({
    before_tax: 0,
    after_tax: 0,
    tax: 0,
  });

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
    getCustomer();
    getProduct();
  }, []);

  const onCreate = async (values: any) => {
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
    console.log(data1);
    try {
      const respUpdate: IRespApiSuccess = await apiInstance.post(`${API_BASE_URL}${path}`, data1);
      if (respUpdate.code === 200) {
        notificationController.success({
          message: 'Tạo thành công',
        });
        navigate(`/quotes/${respUpdate.data.id}`);
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

  const onChangeSelect = (values: any, index: number, add: any, remove: any) => {
    remove(index);
    const dataChange: any = product.find((item: any) => {
      return item.id === values;
    });

    const dataFinal = {
      id: dataChange.id,
      product_id: dataChange.id,
      quantity: dataChange.quantity || 1,
      vat: dataChange.vat || 10,
      price: dataChange.price || 0,
      amount_before_tax: dataChange.amount_before_tax || 0,
      amount: dataChange.amount || 0,
      stt: index + 1,
    };
    newArr[index] = dataFinal;
    add(dataFinal);
    setNewArr([...newArr]);
  };

  const onChangeCustomer = (value: any) => {
    const itemCus = customers.find((item) => {
      if (item.value === value) return item;
    });
    form.setFieldsValue(itemCus);
  };

  const getAmount = (name: string, index: number, add: any, remove: any) => (evt: any) => {
    const value = Number(evt.target.value.replace(/,/g, '')) || 0;
    const data: any = newArr[index];

    let thanhtien_truocvat = 0;
    let thanhtien_sauvat = 0;
    let tien_thue = 0;

    switch (name) {
      case 'quantity':
        data.quantity = value;
        thanhtien_truocvat = value * Number(data.price || 0);
        thanhtien_sauvat = thanhtien_truocvat + thanhtien_truocvat * (Number(data.vat || 0) / 100);
        tien_thue = thanhtien_sauvat - thanhtien_truocvat;
        break;
      case 'price':
        data.price = value;
        thanhtien_truocvat = value * Number(data.quantity || 0);
        thanhtien_sauvat = thanhtien_truocvat + thanhtien_truocvat * (Number(data.vat || 0) / 100);
        tien_thue = thanhtien_sauvat - thanhtien_truocvat;
        break;

      case 'vat':
        data.vat = value;
        thanhtien_truocvat = Number(data.price || 0) * Number(data.quantity || 0);
        thanhtien_sauvat = thanhtien_truocvat + thanhtien_truocvat * (Number(data.vat || 0) / 100);
        tien_thue = thanhtien_sauvat - thanhtien_truocvat;
        break;

      default:
        break;
    }

    data.amount_before_tax = thanhtien_truocvat;
    data.amount = thanhtien_sauvat;
    data.sum_vat = tien_thue;

    newArr[index] = data;
    setNewArr([...newArr]);
    remove(index);
    add(data, index);
    total();
  };

  const total = () => {
    let before_tax = 0;
    let after_tax = 0;
    let tax = 0;
    for (let i = 0; i < newArr.length; i++) {
      before_tax += Number(newArr[i].amount_before_tax);
      after_tax += Number(newArr[i].amount);
    }

    tax = after_tax - before_tax;
    setAmount({ before_tax: before_tax, after_tax: after_tax, tax: tax });
  };

  const onBack = () => {
    navigate(-1);
  };

  const formatter = (value: number | string | undefined) => {
    if (!value) {
      return '';
    }

    const stringValue = typeof value === 'string' ? value : value.toString();

    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parser = (value: string | undefined): any => {
    if (!value) {
      return undefined;
    }

    const parsedValue = value.replace(/(,*)/g, '');

    if (isNaN(Number(parsedValue))) {
      return undefined;
    }

    return parseInt(parsedValue, 10);
  };

  return (
    <>
      {isLoading ? (
        <CustomLoading />
      ) : (
        <Form form={form} onFinish={onCreate} layout="vertical">
          <Row>
            <Col span={24}>
              <Button className="button-back" onClick={onBack}>
                <LeftOutlined /> THÊM BÁO GIÁ
              </Button>
            </Col>
            <Col span={24}>
              <Card>
                <Row gutter={10}>
                  <Col span={24}>
                    <H4 style={{ fontSize: '22px' }}>Thông tin chung</H4>
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
                        disabled
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày báo giá"
                        size="small"
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
                      <Input disabled placeholder="Nhập tên doanh nghiệp" size="small" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <H5></H5>
                    <Form.Item
                      label="Mã số thuế"
                      name="tax_code"
                      rules={[{ required: true, message: 'Mã số thuê không được bỏ trống!' }]}
                    >
                      <Input disabled placeholder="Nhập mã số thuê" size="small" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Email khách hàng"
                      name="email"
                      rules={[{ required: true, message: 'Email khách hàng không được bỏ trống!' }]}
                    >
                      <Input disabled placeholder="Nhập email khách hàng" size="small" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Số điện thoại khách hàng"
                      name="phone_number"
                      rules={[{ required: true, message: 'Số điện thoại khách hàng không được bỏ trống!' }]}
                    >
                      <Input disabled placeholder="Nhập số điện thoại khách hàng" size="small" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <br />
                    <H4 type="secondary">Thông tin sản phẩm</H4>
                    <Form.List name="detail" initialValue={newArr}>
                      {(quote_detail, { add, remove }) => {
                        return (
                          <>
                            <Row gutter={10}>
                              <Col span={3}>
                                <H5>Sản phẩm</H5>
                              </Col>
                              <Col span={3}>
                                <H5>Số lượng</H5>
                              </Col>
                              <Col span={3}>
                                <H5>Đơn giá</H5>
                              </Col>
                              <Col span={3}>
                                <H5>Vat%</H5>
                              </Col>
                              <Col span={3}>
                                <H5>Tiền thuế</H5>
                              </Col>
                              <Col span={4}>
                                <H5>Tiền trước thuế</H5>
                              </Col>
                              <Col span={4}>
                                <H5>Thành tiền</H5>
                              </Col>
                              <Col span={1}>
                                <H5>Xoá</H5>
                              </Col>
                            </Row>
                            {quote_detail.map(({ key, name, ...restField }: any, index) => {
                              return (
                                <Row key={key} gutter={10} style={{ marginBottom: '10px' }}>
                                  <Col span={3}>
                                    <Form.Item
                                      name={[name, 'product_id']}
                                      rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
                                      {...restField}
                                    >
                                      <Select
                                        options={optionProduct}
                                        placeholder="Chọn sản phẩm"
                                        style={{ width: '100%' }}
                                        onChange={(e) => onChangeSelect(e, index, add, remove)}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={3}>
                                    <Form.Item
                                      name={[name, 'quantity']}
                                      rules={[
                                        { required: true, message: 'Số lượng không được bỏ trống' },
                                        minValueRule,
                                      ]}
                                      {...restField}
                                    >
                                      <InputNumber
                                        defaultValue={Number(newArr[index]?.quantity)}
                                        size="small"
                                        style={{ width: '100%' }}
                                        formatter={formatter}
                                        parser={parser}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={3}>
                                    <Form.Item
                                      name={[name, 'price']}
                                      {...restField}
                                      rules={[{ required: true, message: 'Giá không được bỏ trống' }]}
                                    >
                                      <InputNumber
                                        size="small"
                                        style={{ width: '100%' }}
                                        defaultValue={Number(newArr[index]?.price)}
                                        formatter={formatter}
                                        parser={parser}
                                        onBlur={getAmount('price', index, add, remove)}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={3}>
                                    <Form.Item
                                      name={[name, 'vat']}
                                      rules={[
                                        { required: true, message: 'Thuế không được bỏ trống' },
                                        minValueRule,
                                        maxValueRule,
                                      ]}
                                      {...restField}
                                    >
                                      <Input
                                        defaultValue={newArr[index]?.vat}
                                        type="number"
                                        onBlur={getAmount('vat', index, add, remove)}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={3}>
                                    <Form.Item name={[name, 'sum_vat']} {...restField}>
                                      <InputNumber
                                        defaultValue={Number(newArr[index]?.sum_vat)}
                                        disabled
                                        size="small"
                                        style={{ width: '100%' }}
                                        formatter={formatter}
                                        parser={parser}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={4}>
                                    <Form.Item name={[name, 'amount_before_tax']} {...restField}>
                                      <InputNumber
                                        defaultValue={Number(newArr[index]?.amount_before_tax)}
                                        disabled
                                        size="small"
                                        style={{ width: '100%' }}
                                        formatter={formatter}
                                        parser={parser}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={4}>
                                    <Form.Item name={[name, 'amount']} {...restField}>
                                      <InputNumber
                                        defaultValue={Number(newArr[index]?.amount)}
                                        disabled
                                        size="small"
                                        style={{ width: '100%' }}
                                        formatter={formatter}
                                        parser={parser}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={1}>
                                    <DeleteIcon
                                      onClick={() => {
                                        console.log('remove(name) > ', name);
                                        remove(name);
                                        newArr.splice(1, 1);
                                        setNewArr([...newArr]);
                                      }}
                                      color="red"
                                    />
                                  </Col>
                                </Row>
                              );
                            })}
                            <Button
                              onClick={() => {
                                add(defaultDetail);
                                newArr.push(defaultDetail);
                                setNewArr([...newArr]);
                              }}
                            >
                              Thêm sản phẩm
                            </Button>
                          </>
                        );
                      }}
                    </Form.List>
                  </Col>
                  <Col span={24}>
                    <Row gutter={10} justify={'end'} style={{ marginTop: '10px', textAlign: 'right' }}>
                      <Col span={24}>
                        <span>Tổng thành tiền trước thuế:</span> &nbsp;
                        <span>{amount.before_tax?.toLocaleString('en-US', { useGrouping: true })}</span>
                        {/* <span>{numeral(data?.total_before_tax).format('0,0 đ')}đ</span> */}
                      </Col>
                      <Col span={24}>
                        <span>Tổng tiền thuế:</span> &nbsp;
                        <span>{amount.tax?.toLocaleString('en-US', { useGrouping: true })}</span>
                        {/* <span>{numeral(data.total_tax_amount).format('0,0 đ')}đ</span> */}
                      </Col>
                      <Col span={24} style={{ fontWeight: 700 }}>
                        <span>Tổng cộng:</span> &nbsp;
                        <span>{amount.after_tax?.toLocaleString('en-US', { useGrouping: true })}</span>
                        {/* <span>{numeral(data.total_amount).format('0,0 đ')}đ</span> */}
                      </Col>
                    </Row>
                  </Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Tạo báo giá
                    </Button>
                  </Form.Item>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default CreateQuotes;
