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
import { Select } from '@app/components/common/selects/Select/Select';
import { Input } from '@app/components/common/inputs/Input/Input';
import { getProductList } from '@app/api/app/api';

const CreateQuotes: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataTable, setDataTable] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [editable, setEditable] = useState(false);
  const [product, setProduct] = useState([]);
  const defaultNewRow = {
    stt: count + 1,
    product: '',
    quantity: '',
    price: '',
    vat: '',
    amount_before_tax: '',
    amount: '',
  };

  // useEffect(() => {
  //   async function getData() {
  //     setIsLoading(true);
  //     const result = await getDataById(Number(id), '/quotes');
  //     result[0]?.quote_detail?.map((item: any, index: number) => {
  //       return (item.stt = index + 1);
  //     });
  //     setData(result[0]);
  //     setDataTable(result[0]?.quote_detail);
  //     setCount(result[0]?.quote_detail.length);
  //     setIsLoading(false);
  //   }
  //   getData();
  // }, [id]);

  const onEdit = async () => {
    setIsEdit(true);
    setEditable(!editable);
    const productList = await getProductList();
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

  // Hàm render ô dữ liệu cho dòng có thể chỉnh sửa
  const renderEditableCell = (text: string | number, record: any, dataIndex: any) => {
    return editable ? (
      dataIndex === 'product' ? (
        <Select
          defaultValue={text}
          placeholder="Chọn sản phẩm"
          onChange={(value) => handleCellChange(record.id, dataIndex, value)}
          style={{ width: '100%' }}
          options={product}
        />
      ) : (
        <Input
          defaultValue={text}
          placeholder="Nhập dữ liệu"
          onChange={(e) => handleCellChange(record.id, dataIndex, e.target.value)}
        />
      )
    ) : (
      text
    );
  };

  const combinedColumns = columns.concat(actionColums);

  const onBack = () => {
    navigate(-1);
  };

  return (
    <DetailQuotesStyles>
      <Form form={form} onFinish={onUpdate}>
        <Row>
          <Col span={24}>
            <Row gutter={10}>
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
                <Form.Item name="customer_id" rules={[{ required: true, message: 'Khách hàng không được bỏ trống!' }]}>
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
                <Form.Item name="email" rules={[{ required: true, message: 'Email khách hàng không được bỏ trống!' }]}>
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
                <Form.Item name="total_amount" rules={[{ required: true, message: 'Tổng cộng không được bỏ trống!' }]}>
                  <Input placeholder="Nhập tổng cộng" size="small" />
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
    </DetailQuotesStyles>
  );
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

export default CreateQuotes;
