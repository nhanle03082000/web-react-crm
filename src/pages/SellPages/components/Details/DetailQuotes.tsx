import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { getProductList } from '@app/api/app/api';
import { getDataById } from '@app/api/app/api_getDataById';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { Card } from '@app/components/common/Card/Card';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { H4 } from '@app/components/common/typography/H4/H4';
import { H5 } from '@app/components/common/typography/H5/H5';
import CustomLoading from '@app/components/customs/CustomLoading';
import { maxValueRule, minValueRule } from '@app/utils/utils';
import { Col, Form, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditDetail from './EditDetail';

const DetailQuotes: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState<any>([]);
  const [editable, setEditable] = useState(false);
  const [product, setProduct] = useState([]);
  const [amount, setAmount] = useState<any>({
    before_tax: 0,
    after_tax: 0,
    tax: 0,
  });

  const defaultDetail = {
    stt: 1,
    product_id: null,
    quantity: 1,
    price: 0,
    vat: 0,
    amount_before_tax: 0,
    amount: 0,
  };

  const [optionProduct, setOptionProduct] = useState<any>([]);

  const onBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const result = await getDataById(Number(id), '/quotes');
      result?.quote_detail?.map((item: any, index: number) => {
        return (item.stt = index + 1);
      });
      result.quote_detail.map((item: any) => {
        return (item.sum_vat = (item.quantity * item.price * item.vat) / 100);
      });
      setData(result);
      setDataTable(result?.quote_detail);
      setIsLoading(false);
    }
    getData();
  }, [id, isEdit]);

  const onEdit = async () => {
    setIsEdit(true);
    setEditable(!editable);
    const productList = await getProductList();
    const options = productList.map((item: any) => {
      return { value: item.id, label: item.name };
    });
    setOptionProduct(options);
    setProduct(productList);
  };

  const onChangeSelect = (values: any, index: number, add: any, remove: any) => {
    remove(index);
    const dataChange: any = product.find((item: any) => {
      return item.id === values;
    });

    const dataFinal = {
      product_id: dataChange.id,
      quantity: dataChange.quantity || 1,
      vat: dataChange.vat || 10,
      sum_vat: (dataChange.quantity * dataChange.price * dataChange.vat) / 100 || 100,
      price: dataChange.price || 1000,
      amount_before_tax: dataChange.amount_before_tax || 0,
      amount: dataChange.amount || 0,
      stt: index + 1,
    };
    dataTable[index] = dataFinal;
    add(dataFinal);
    setDataTable([...dataTable]);
  };

  const getAmount = (name: string, index: number, add: any, remove: any) => (evt: any) => {
    console.log(dataTable);
    const value = Number(evt.target.value) || 0;
    const data: any = dataTable[index];

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
    data.sum_vat = tien_thue;
    data.amount = thanhtien_sauvat;
    dataTable[index] = data;
    setDataTable([...dataTable]);
    remove(index);
    add(data, index);
    total();
  };

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      render: (record: any) => {
        return record?.name || null;
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'right',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      align: 'right',
      render: (record: any) => {
        return record?.toLocaleString('en-US', { useGrouping: true });
      },
    },
    {
      title: 'VAT%',
      dataIndex: 'vat',
      align: 'right',
    },
    {
      title: 'Tiền thuế',
      dataIndex: 'vat',
      align: 'right',
      render: (_text: string, record: any) => {
        return record.quantity * record.price * (record.vat / 100);
      },
    },
    {
      title: 'Thành tiền trước thuế',
      dataIndex: 'amount_before_tax',
      align: 'right',
      render: (record: any) => {
        return record?.toLocaleString('en-US', { useGrouping: true });
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      align: 'right',
      render: (record: any) => {
        return record?.toLocaleString('en-US', { useGrouping: true });
      },
    },
  ];

  const total = () => {
    let before_tax = 0;
    let after_tax = 0;
    let tax = 0;
    console.log(dataTable.length);
    for (let i = 0; i < dataTable.length; i++) {
      before_tax += Number(dataTable[i].amount_before_tax);
      after_tax += Number(dataTable[i].amount);
    }

    tax = after_tax - before_tax;
    setAmount({ before_tax: before_tax, after_tax: after_tax, tax: tax });
  };

  return (
    <DetailQuotesStyles>
      <Row>
        <Col span={24}>
          {isEdit ? (
            <Button className="button-back" onClick={() => setIsEdit(false)}>
              <LeftOutlined /> SỬA BÁO GIÁ
            </Button>
          ) : (
            <Button className="button-back" onClick={onBack}>
              <LeftOutlined /> CHI TIẾT BÁO GIÁ
            </Button>
          )}
        </Col>
        <Col span={24}>
          {isLoading ? (
            <CustomLoading />
          ) : (
            <Card padding="1.25rem">
              <Row gutter={[10, 10]}>
                <Col span={12}>
                  <H4>Thông tin chung</H4>
                </Col>
                <Col span={12} style={{ position: 'relative' }}>
                  {!isEdit && (
                    <Button className="button-edit" onClick={onEdit}>
                      <EditOutlined style={{ fontSize: '24px', color: 'var(--primary-color)' }} />
                    </Button>
                  )}
                </Col>
                {isEdit ? (
                  <Col span={24}>
                    <EditDetail data={data} setIsEdit={setIsEdit} amount={amount}>
                      <Form.List name="detail" initialValue={dataTable}>
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
                                        rules={[{ required: true, message: 'error' }]}
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
                                        <Input
                                          defaultValue={dataTable[index]?.quantity}
                                          type="number"
                                          onBlur={getAmount('quantity', index, add, remove)}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                      <Form.Item
                                        name={[name, 'price']}
                                        {...restField}
                                        rules={[{ required: true, message: 'Giá không được bỏ trống' }, minValueRule]}
                                      >
                                        <Input
                                          size="small"
                                          defaultValue={dataTable[index]?.price}
                                          type="number"
                                          min={1}
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
                                          defaultValue={dataTable[index]?.vat}
                                          type="number"
                                          onBlur={getAmount('vat', index, add, remove)}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                      <Form.Item name={[name, 'sum_vat']} {...restField}>
                                        <Input defaultValue={dataTable[index]?.vat} disabled />
                                      </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                      <Form.Item name={[name, 'amount_before_tax']} {...restField}>
                                        <Input defaultValue={dataTable[index]?.amount_before_tax} disabled />
                                      </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                      <Form.Item name={[name, 'amount']} {...restField}>
                                        <Input defaultValue={dataTable[index]?.amount} disabled />
                                      </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                      <DeleteIcon
                                        onClick={() => {
                                          console.log('remove(name) > ', name);
                                          remove(name);
                                          dataTable.splice(1, 1);
                                          setDataTable([...dataTable]);
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
                                  dataTable.push(defaultDetail);
                                  setDataTable([...dataTable]);
                                }}
                              >
                                Thêm sản phẩm
                              </Button>
                            </>
                          );
                        }}
                      </Form.List>
                    </EditDetail>
                  </Col>
                ) : (
                  <>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Ngày báo giá:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>
                        {moment(new Date(data.quote_date).toUTCString()).format('DD/MM/YYYY')}
                      </Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Tên doanh nghiệp:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.company_name}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Tên khách hàng:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.customer?.name}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Mã số thuế:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.tax_code}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Email khách hàng:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.email}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Số điện thoại khách hàng:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.phone_number}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Nhân viên phụ trách:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.employee?.name}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Số điện thoại nhân viên:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.employee?.phone}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Tổng cộng:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>
                        {data.total_amount?.toLocaleString('en-US', { useGrouping: true })}đ
                      </Typography.Text>
                    </Col>
                  </>
                )}
              </Row>
              <Row style={{ marginTop: '20px' }}>
                {!isEdit && (
                  <Col span={24}>
                    <H4>Thông tin sản phẩm</H4>
                    <Table columns={columns} dataSource={dataTable} rowKey="id" bordered pagination={false} />
                  </Col>
                )}
                <Col span={24}>
                  <Row gutter={10} justify={'end'} style={{ marginTop: '10px', textAlign: 'right' }}>
                    <Col span={24}>
                      <span>Tổng thành tiền trước thuế:</span> &nbsp;
                      <span>
                        {amount.before_tax === 0
                          ? data.total_before_tax?.toLocaleString('en-US', { useGrouping: true })
                          : amount.before_tax?.toLocaleString('en-US', { useGrouping: true })}
                        đ
                      </span>
                    </Col>
                    <Col span={24}>
                      <span>Tổng tiền thuế:</span> &nbsp;
                      <span>
                        {amount.tax === 0
                          ? data.total_tax_amount?.toLocaleString('en-US', { useGrouping: true })
                          : amount.tax?.toLocaleString('en-US', { useGrouping: true })}
                        đ
                      </span>
                    </Col>
                    <Col span={24} style={{ fontWeight: 700 }}>
                      <span>Tổng cộng:</span> &nbsp;
                      <span>
                        {amount.after_tax === 0
                          ? data.total_amount?.toLocaleString('en-US', { useGrouping: true })
                          : amount.after_tax?.toLocaleString('en-US', { useGrouping: true })}
                        đ
                      </span>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
    </DetailQuotesStyles>
  );
};

const DetailQuotesStyles = styled.div`
  h4 {
    color: var(--primary-color) !important;
    font-size: 22px !important;
  }
  .button-edit {
    position: absolute;
    right: 0px;
    border: none;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-item {
    line-height: 26px;
    font-size: 14px;
  }
`;

export default DetailQuotes;
