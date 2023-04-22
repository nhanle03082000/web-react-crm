import { LeftOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/app/api_getDataById';
import { Card } from '@app/components/common/Card/Card';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { H4 } from '@app/components/common/typography/H4/H4';
import { Col, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const DetailOrder: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const result = await getDataById(Number(id), '/orders');
      result?.detail.map((item: any, index: number) => {
        return (item.stt = index + 1);
      });
      setData(result);
    }
    getData();
  }, [id]);

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: 'Tên gói',
      dataIndex: 'product_sub',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      align: 'right',
    },
  ];

  const onBack = () => {
    navigate(-1);
  };

  return (
    <DetailQuotesStyles>
      <Row>
        <Col span={24}>
          <Button className="button-back" onClick={onBack}>
            <LeftOutlined /> CHI TIẾT ĐƠN HÀNG
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
                    Mã số thuế:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>{data.tax_code}</Typography.Text>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                  <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                    Số hợp đồng:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>{data.contract_no}</Typography.Text>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                  <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                    Ngày bắt đầu:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>
                    {moment(new Date(data.started_date).toUTCString()).format('DD/MM/YYYY')}
                  </Typography.Text>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                  <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                    Ngày kết thúc:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>
                    {moment(new Date(data.end_date).toUTCString()).format('DD/MM/YYYY')}
                  </Typography.Text>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                  <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                    Mã đơn vị phát triển:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>{data.shop_code}</Typography.Text>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                  <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                    Tên đơn vị phát triển:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>{data.shop_name}</Typography.Text>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                  <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                    Mã nhân viên phát triển:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>{data.am_code}</Typography.Text>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                  <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                    Tên nhân viên phát triển:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>{data.am_name}</Typography.Text>
                </Col>
                <Col span={12} style={{ display: 'flex', alignItems: 'end' }}>
                  <Typography.Title level={5} style={{ margin: '0 20px 0 0' }}>
                    Tên sản phẩm:
                  </Typography.Title>
                  &nbsp;
                  <Typography.Text>{data.product?.name}</Typography.Text>
                </Col>
              </Row>
              <Row style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <H4>Thông tin sản phẩm</H4>
                </Col>
                <Col span={24}>
                  <Table columns={columns} dataSource={data.detail} rowKey="id" bordered pagination={false} />
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
`;

export default DetailOrder;
