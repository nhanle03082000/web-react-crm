import { EditOutlined, LeftOutlined, RestOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/app/api_getDataById';
import { Card } from '@app/components/common/Card/Card';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { H4 } from '@app/components/common/typography/H4/H4';
import CustomLoading from '@app/components/customs/CustomLoading';
import { Col, Form, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditDetail from './EditDetail';
import { Select } from '@app/components/common/selects/Select/Select';
import { Input } from '@app/components/common/inputs/Input/Input';
import { getProductList } from '@app/api/app/api';
import { H5 } from '@app/components/common/typography/H5/H5';

const DetailQuotes: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [editable, setEditable] = useState(false);
  const [product, setProduct] = useState([]);
  const [productListItem, setProductListItem] = useState<any>([]);
  const [optionProduct, setOptionProduct] = useState<any>([]);
  const [quantity, setQuantity] = useState([]);
  const defaultNewRow = {
    stt: count + 1,
    product: '',
    quantity: '',
    price: '',
    vat: '',
    amount_before_tax: '',
    amount: '',
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const result = await getDataById(Number(id), '/quotes');
      result[0]?.quote_detail?.map((item: any, index: number) => {
        return (item.stt = index + 1);
      });
      setData(result[0]);
      setDataTable(result[0]?.quote_detail);
      setCount(result[0]?.quote_detail.length);
      setIsLoading(false);
    }
    getData();
  }, [id]);

  // async function getProductListItem(productId: number) {
  //   const result = await getDataById(productId, '/products');
  //   setProductListItem(result);
  // }

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

  const addRow = () => {
    setCount(count + 1);
    setDataTable([...dataTable, defaultNewRow]);
  };

  const handleDeleteRow = (record: any) => {
    const newData = [...dataTable];
    const index = newData.findIndex((item) => item.stt === record.stt); // Tìm vị trí của dòng cần xoá trong mảng dữ liệu
    newData.splice(index, 1); // Xoá dòng đó khỏi mảng dữ liệu
    setDataTable(newData); // Cập nhật lại giá trị của biến state dataSource
  };

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      render: (text: any, record: any) => {
        return renderEditableCell(text.name, record, 'product');
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'right',
      render: (text: string, record: any) => {
        return renderEditableCell(text, record, 'quantity');
      },
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      align: 'right',
      render: (text: number, record: any) => {
        return renderEditableCell(text, record, 'price');
        // return `${numeral(record).format('0,0 đ')}đ`;
      },
    },
    {
      title: 'VAT%',
      dataIndex: 'vat',
      align: 'right',
      render: (text: number, record: any) => {
        return renderEditableCell(text, record, 'vat');
        // return `${record}%`;
      },
    },
    {
      title: 'Thành tiền trước thuế',
      dataIndex: 'amount_before_tax',
      align: 'right',
      render: (text: number, record: any) => {
        return renderEditableCell(text, record, 'total_before_tax');
        // return `${numeral(record).format('0,0 đ')}đ`;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      align: 'right',
      render: (text: number, record: any) => {
        return renderEditableCell(text, record, 'amount');
        // return `${numeral(record).format('0,0 đ')}đ`;
      },
    },
  ];

  const actionColums: ColumnsType = [
    {
      title: 'Thao tác',
      dataIndex: 'stt',
      align: 'center',
      render: (record: any) =>
        isEdit ? <RestOutlined onClick={() => handleDeleteRow(record)} style={{ color: 'red' }} /> : null,
    },
  ];

  const handleCellChange = (recordId: number, dataIndex: any, value: any) => {
    setDataTable((prevDataTable: any) =>
      prevDataTable.map((record: any) => (record.id === recordId ? { ...record, [dataIndex]: value } : record)),
    );
  };

  const handleCellChangeSelect = async (recordId: number, dataIndex: any, value: any) => {
    const data = await getDataById(recordId, '/products');
    setDataTable((prevDataTable: any) =>
      prevDataTable.map((record: any) => (record.id === recordId ? { ...record, vat: data.name } : record)),
    );
  };

  // Hàm render ô dữ liệu cho dòng có thể chỉnh sửa
  const renderEditableCell = (text: string | number, record: any, dataIndex: any) => {
    return editable ? (
      dataIndex === 'product' ? (
        <Select
          defaultValue={text}
          placeholder="Chọn sản phẩm"
          onChange={(value) => handleCellChangeSelect(record.id, dataIndex, value)}
          style={{ width: '100%' }}
          options={product}
        />
      ) : (
        <Input
          value={text}
          placeholder="Nhập dữ liệu"
          onChange={(e) => handleCellChange(record.id, dataIndex, e.target.value)}
        />
      )
    ) : (
      text
    );
  };

  const [detail, setDetail] = useState<any>([]);
  const defaultDetail = {
    stt: 1,
    product_id: productListItem.name,
    quantity: 1,
    price: productListItem.marketplace_product_id,
    vat: 10,
    amount_before_tax: 10,
    amount: 1000,
  };
  const addRow1 = () => {
    setDataTable([...dataTable, defaultDetail]);
  };

  const deleteRow = (index: number) => {
    const newArr = detail.filter((data: any, idx: number) => idx !== index);
    console.log('@deleteRow', newArr);
    setDetail([...newArr]);
  };

  const combinedColumns = columns.concat(actionColums);

  const onChangeField = (value: any) => {
    setProductListItem(
      product.find((item: any) => {
        return item.id === value;
      }),
    );
  };

  const onChangeSelect = (values: any, index: number) => {
    console.log('onChangeSelect ~ index:', index);
    console.log('onChangeSelect ~ values:', values);
    console.log('onChangeSelect ~ product:', product);
    const dataChange: any = product.find((item: any) => {
      return item.id === values;
    });
    // dataTable.splice(index, 1, {
    //   price: dataChange.price || 0,
    // });
    console.log('B4', dataTable);
    dataChange.price = dataChange.price || 0;
    dataChange.amount = dataChange.amount || 100;
    dataTable[index] = dataChange;
    console.log('AT', dataTable);

    setDataTable([...dataTable]);
  };

  const addNewDetail = (add: any) => () => {
    console.log('@addNewDetail', defaultDetail);
    add(defaultDetail);
  };

  const getAmount = (quantity: number, index: number) => {
    const vat = dataTable[index].vat;
    const price = dataTable[index].vat;
    const amount1 = (vat / 100) * price * quantity;
    console.log('getAmount ~ amount1:', amount1);
  };

  const onBack = () => {
    navigate(-1);
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
                    <EditDetail data={data} setIsEdit={setIsEdit} dataTable={dataTable}>
                      <Form.List name="detail" initialValue={dataTable}>
                        {(quote_detail, { add, remove }) => {
                          return (
                            <>
                              <Button onClick={() => add(defaultDetail)}>Thêm</Button>
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
                                console.log(restField, index, detail, dataTable);
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
                                          onChange={(e) => onChangeSelect(e, index)}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                      <Form.Item
                                        name={[name, 'quantity']}
                                        rules={[{ required: true, message: 'Thong loi o day' }]}
                                        {...restField}
                                      >
                                        <MyInput
                                          initValue={dataTable[index]?.quantity}
                                          onChange={() => getAmount(dataTable[index]?.quantity, index)}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                      <Form.Item name={[name, 'price']} {...restField}>
                                        <MyInput initValue={dataTable[index]?.price} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                      <Form.Item
                                        name={[name, 'vat']}
                                        rules={[{ required: true, message: 'Thong loi o day' }]}
                                        {...restField}
                                      >
                                        <MyInput initValue={dataTable[index]?.vat} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                      <Form.Item
                                        name={[name, 'amount_before_tax']}
                                        rules={[{ required: true, message: 'Thong loi o day' }]}
                                        {...restField}
                                      >
                                        <MyInput initValue={dataTable[index]?.amount_before_tax} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={3}>
                                      <Form.Item
                                        name={[name, 'amount']}
                                        rules={[{ required: true, message: 'Thong loi o day' }]}
                                        {...restField}
                                      >
                                        <MyInput initValue={dataTable[index]?.amount} />
                                      </Form.Item>
                                    </Col>
                                    <Col span={1}>
                                      <RestOutlined
                                        onClick={() => remove(name)}
                                        style={{ color: '#ff4d4f', fontSize: '24px', marginTop: '4px' }}
                                      />
                                    </Col>
                                  </Row>

                                  // <Row key={id} gutter={10} style={{ marginBottom: '10px' }}>

                                  //   <Col span={4}>
                                  //     <Form.Item
                                  //       name={[item.amount_in_words, 'amount_in_words']}
                                  //       rules={[{ required: true, message: 'error' }]}
                                  //       {...item}
                                  //     >
                                  //       <div></div>
                                  //       {/* <MyInput initValue={item.quantity} /> */}
                                  //     </Form.Item>
                                  //   </Col>
                                  //   <Col span={4}>
                                  //     <Form.Item
                                  //       name={[item.price, 'price']}
                                  //       rules={[{ required: true, message: 'Missing first name' }]}
                                  //       {...item}
                                  //     >
                                  //       <MyInput initValue={item.price} />
                                  //     </Form.Item>
                                  //   </Col>
                                  //   <Col span={4}>
                                  //     <Form.Item
                                  //       name={[item.vat, 'vat']}
                                  //       rules={[{ required: true, message: 'Missing first name' }]}
                                  //       {...item}
                                  //     >
                                  //       <MyInput initValue={item.vat} />
                                  //     </Form.Item>
                                  //   </Col>
                                  //   <Col span={4}>
                                  //     <Form.Item
                                  //       name={[item.amount_before_tax, 'amount_before_tax']}
                                  //       rules={[{ required: true, message: 'Missing first name' }]}
                                  //       {...item}
                                  //     >
                                  //       <MyInput initValue={item.amount_before_tax} />
                                  //     </Form.Item>
                                  //   </Col>
                                  //   <Col span={3}>
                                  //     <Form.Item
                                  //       name={[item.amount, 'first']}
                                  //       rules={[{ required: true, message: 'Missing first name' }]}
                                  //       {...item}
                                  //     >
                                  //       <MyInput initValue={item.amount} />
                                  //     </Form.Item>
                                  //   </Col>
                                  //   <Col span={1}>
                                  //     <RestOutlined
                                  //       onClick={() => deleteRow(index)}
                                  //       style={{ color: '#ff4d4f', fontSize: '24px', marginTop: '4px' }}
                                  //     />
                                  //   </Col>
                                  // </Row>
                                );
                              })}
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
                        Mã báo giá:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.code}</Typography.Text>
                    </Col>
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
                        Tên doanh nghiệp
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.customer?.company_name}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Khách hàng
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.customer?.name}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Mã số thuế
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.customer?.tax_code}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Email khách hàng
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.customer?.email}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Số điện thoại khách hàng:
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.customer?.phone_number}</Typography.Text>
                    </Col>
                    <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                      <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                        Nhân viên phụ trách
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
                        Tổng cộng
                      </Typography.Title>
                      &nbsp;
                      <Typography.Text>{data.total_amount}</Typography.Text>
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
                      <span>{numeral(data?.total_before_tax).format('0,0 đ')}đ</span>
                    </Col>
                    <Col span={24}>
                      <span>Tổng tiền thuế:</span> &nbsp;
                      <span>{numeral(data.total_tax_amount).format('0,0 đ')}đ</span>
                    </Col>
                    <Col span={24} style={{ fontWeight: 700 }}>
                      <span>Tổng cộng:</span> &nbsp;
                      <span>{numeral(data.total_amount).format('0,0 đ')}đ</span>
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

const MyInput = (props: { initValue: string; disabled?: boolean; onChange?: any }) => {
  const [value, setValue] = useState(props.initValue);
  const onChange1 = (evt: any) => {
    props.onChange();
    setValue(evt.target.value);
  };
  useEffect(() => {
    setValue(props.initValue);
  }, [props.initValue]);

  return <Input value={value} onChange={onChange1} disabled={props.disabled} />;
};

const DetailQuotesStyles = styled.div`
  h4 {
    color: var(--primary-color) !important;
    font-size: 18px !important;
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
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
  .ant-select-single:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input {
    height: 30px;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    line-height: 26px;
  }
`;

export default DetailQuotes;
