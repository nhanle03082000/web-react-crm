import { EyeOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Table } from '@app/components/common/Table/Table';
import { H5 } from '@app/components/common/typography/H5/H5';
import CustomPagination from '@app/components/customs/CustomPagination';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { Col, Modal, Row, Space, Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

interface IProps {
  id: number;
}

const CustomerInteractions: React.FC<IProps> = ({ id }) => {
  const path = API_URL.CUSTOMERINTERACTIONS;
  const [dataContacts, setDataContacts] = useState<any>([]);
  const [content, setContent] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'logs.createdAt',
  });

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
  };

  const f = Object.entries(filter)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getContent = (values: any) => {
    setIsModalOpen(true);
    setContent(values);
  };

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      render: (record: string): any => {
        switch (record) {
          case 'POST':
            return 'Tạo';
            break;
          case 'PUT':
            return 'Cập nhật';
            break;
          case 'DELETE':
            return 'Xoá';
            break;
          default:
            break;
        }
      },
    },
    {
      title: 'Nội dung',
      dataIndex: 'param',
      align: 'center',
      render: (record: any) => {
        return (
          <Tooltip placement="bottom" title="Xem nội dung">
            <Typography.Link onClick={() => getContent(JSON.parse(record))}>
              <EyeOutlined style={{ color: '#000' }} />
            </Typography.Link>
          </Tooltip>
        );
      },
    },
    {
      title: 'IP máy truy cập',
      dataIndex: 'ip',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      align: 'right',
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'user',
      render: (record: any): string => {
        return record.name;
      },
    },
  ];

  const getCustomerContactsList = async () => {
    setIsLoading(true);
    try {
      const respContacts: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}${path}?customers/interactions?customers=${id}&${f}`,
      );
      if (respContacts.code === 200) {
        respContacts.data.collection.map((item: any, index: number) => {
          return (item.stt = index + 1);
        });
        setDataContacts(respContacts.data.collection);
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (id != 0) {
      getCustomerContactsList();
    }
  }, []);

  return (
    <>
      <Table
        columns={columns}
        loading={isLoading}
        dataSource={dataContacts}
        scroll={{ x: 800 }}
        rowKey="id"
        bordered
        pagination={false}
      />
      {dataContacts.length > 0 && (
        <CustomPagination
          totalItems={filter.total}
          itemsPerPage={filter.limit}
          currentPage={filter.page}
          onPageChange={handlePageChange}
        />
      )}
      <Modal
        centered
        footer={false}
        title="NỘI DUNG"
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={700}
      >
        <Row>
          <Col span={24}>
            <Space>
              <H5>Mã số thuế:</H5>
              <Typography.Text>{content?.tax_code}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Tên doanh nghiệp:</H5>
              <Typography.Text>{content?.company_name}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Họ tên:</H5>
              <Typography.Text>{content?.name}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Số điện thoại di động:</H5>
              <Typography.Text>{content?.phone_number}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Số điện thoại doanh nghiệp:</H5>
              <Typography.Text>{content?.headquarters_phone}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Email doanh nghiệp:</H5>
              <Typography.Text>{content?.headquarters_email}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Nguồn gốc:</H5>
              <Typography.Text>{content?.customer_source_id}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Lĩnh vực hoạt động:</H5>
              <Typography.Text>{content?.company_field_id}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Quy trình bán hàng:</H5>
              <Typography.Text>{content?.sale_process_id}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Địa chỉ trụ sở chính:</H5>
              <Typography.Text>{content?.headquarters_address}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Tỉnh/Thành phố:</H5>
              <Typography.Text>{content?.headquarters_province_id}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Quận/Huyện:</H5>
              <Typography.Text>{content?.headquarters_district_id}</Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <H5>Phường xã:</H5>
              <Typography.Text>{content?.headquarters_area_id}</Typography.Text>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default CustomerInteractions;
