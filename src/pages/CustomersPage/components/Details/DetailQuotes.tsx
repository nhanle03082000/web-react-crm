import { LeftOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/app/api_getDataById';
import { Card } from '@app/components/common/Card/Card';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { H4 } from '@app/components/common/typography/H4/H4';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import numeral from 'numeral';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  id: number;
  setActiveTab: any;
}

const DetailQuotes: React.FC<IProps> = ({ id, setActiveTab }) => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    async function getData() {
      const result = await getDataById(id, '/quotes');
      result.quote_detail.map((item: any, index: number) => {
        return (item.stt = index + 1);
      });
      setData(result);
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
        return `${numeral(record).format('0,0 đ')}đ`;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      render: (record: number): string => {
        return `${numeral(record).format('0,0 đ')}đ`;
      },
    },
  ];

  return (
    <DetailQuotesStyles>
      <Row>
        <Col span={24}>
          <Button className="button-back" onClick={() => setActiveTab(1)}>
            <LeftOutlined /> CHI TIẾT LỊCH SỬ BÁO GIÁ
          </Button>
        </Col>
        <Col span={24}>
          {data && (
            <Card padding="1.25rem">
              <Row gutter={[10, 10]}>
                <Col span={24}>
                  <H4>Thông tin chung</H4>
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
              <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <H4>Thông tin sản phẩm</H4>
                </Col>
                <Col span={24}>
                  <Table columns={columns} dataSource={data.quote_detail} rowKey="id" bordered pagination={false} />
                  <Row justify={'end'} style={{ marginTop: '10px' }}>
                    <span>Tổng cộng:</span> &nbsp;
                    <Col span={3}>
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

const DetailQuotesStyles = styled.div`
  h4 {
    color: var(--primary-color) !important;
  }
`;

export default DetailQuotes;
