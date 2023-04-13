import { Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import * as S from '../../Customer.styles';
import { getDataById } from '@app/api/app/api_getDataById';
import moment from 'moment';
import numeral from 'numeral';
import { Table } from '@app/components/common/Table/Table';

interface IProps {
  id: number;
  setIsDetailQuotes: any;
}

const DetailsQuotes: React.FC<IProps> = ({ id, setIsDetailQuotes }) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    async function getData() {
      const result = await getDataById(14, '/quotes');
      result[0].quote_detail.map((item: any, index: number) => {
        return (item.stt = index + 1);
      });
      setData(result[0]);
    }
    getData();
  }, [id]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'VAT%',
      dataIndex: 'vat',
      render: (record: number): string => {
        return `${record}%`;
      },
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      render: (record: number): string => {
        return `${numeral(record).format('0,0 đ')} vnđ`;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      render: (record: number): string => {
        return `${numeral(record).format('0,0 đ')} vnđ`;
      },
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <S.ButtonBack onClick={() => setIsDetailQuotes(false)}>&#60; CHI TIẾT LỊCH SỬ BÁO GIÁ</S.ButtonBack>
      </Col>
      <Col span={24}>
        {data && (
          <S.Card padding="1.25rem">
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <Typography.Title level={5}>THÔNG TIN CHUNG</Typography.Title>
              </Col>
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
                  Khách hàng:
                </Typography.Title>
                &nbsp;
                <Typography.Text>{data.customer?.name}</Typography.Text>
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                  Mã số thuế:
                </Typography.Title>
                &nbsp;
                <Typography.Text>{data.customer?.tax_code}</Typography.Text>
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                  Số điện thoại:
                </Typography.Title>
                &nbsp;
                <Typography.Text>{data.customer?.phone_number}</Typography.Text>
              </Col>
              <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                  Email:
                </Typography.Title>
                &nbsp;
                <Typography.Text>{data.customer?.email}</Typography.Text>
              </Col>
              <Col span={24} style={{ display: 'flex', alignItems: 'end' }}>
                <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                  Địa chỉ:
                </Typography.Title>
                &nbsp;
                <Typography.Text>{data.customer?.company_name}</Typography.Text>
              </Col>
            </Row>
            <Table columns={columns} dataSource={data.quote_detail} rowKey="id" />
            <Row justify={'end'}>
              <span>Tổng cộng:</span> &nbsp;
              <Col span={3}>
                <span>{numeral(data.total_amount).format('0,0 đ')} vnđ</span>
              </Col>
            </Row>
          </S.Card>
        )}
      </Col>
    </Row>
  );
};

export default DetailsQuotes;
