import { EditOutlined, LeftOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/app/api_getDataById';
import { Card } from '@app/components/common/Card/Card';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { H4 } from '@app/components/common/typography/H4/H4';
import CustomLoading from '@app/components/customs/CustomLoading';
import { Col, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import numeral from 'numeral';
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

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const result = await getDataById(Number(id), '/quotes');
      result[0]?.quote_detail?.map((item: any, index: number) => {
        return (item.stt = index + 1);
      });
      setData(result[0]);
      setIsLoading(false);
    }
    getData();
  }, [id]);

  const onEdit = () => {
    setIsEdit(true);
  };

  const columns: ColumnsType = [
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
      align: 'right',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      align: 'right',
      render: (record: number): string => {
        return `${numeral(record).format('0,0 đ')}đ`;
      },
    },
    {
      title: 'VAT%',
      dataIndex: 'vat',
      align: 'right',
      render: (record: number): string => {
        return `${record}%`;
      },
    },
    {
      title: 'Thành tiền trước thuế',
      dataIndex: 'total_before_tax',
      align: 'right',
      render: (record: number): string => {
        return `${numeral(record).format('0,0 đ')}đ`;
      },
    },
    {
      title: 'Thành tiền',
      dataIndex: 'amount',
      align: 'right',
      render: (record: number): string => {
        return `${numeral(record).format('0,0 đ')}đ`;
      },
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
            <LeftOutlined /> CHI TIẾT BÁO GIÁ
          </Button>
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
                    <EditDetail data={data} setIsEdit={setIsEdit} />
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
                <Col span={24}>
                  <H4>Thông tin sản phẩm</H4>
                </Col>
                <Col span={24}>
                  <Table columns={columns} dataSource={data?.quote_detail} rowKey="id" bordered pagination={false} />
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
`;

export default DetailQuotes;
