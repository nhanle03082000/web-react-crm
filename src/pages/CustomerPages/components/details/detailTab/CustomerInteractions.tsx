import { EyeOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Table } from '@app/components/common/Table/Table';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Modal, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  id: number;
}

const CustomerInteractions: React.FC<IProps> = ({ id }) => {
  const path = API_URL.CUSTOMERINTERACTIONS;
  const [dataContacts, setDataContacts] = useState<any>([]);
  console.log('dataContacts:', dataContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
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
      dataIndex: 'content',
      render: () => {
        return (
          <Typography.Link
            onClick={showModal}
            // style={checkPermission?.edit ? { display: 'unset' } : { display: 'none' }}
          >
            <EyeOutlined />
          </Typography.Link>
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
      editable: false,
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'user',
      editable: false,
      render: (record: any): string => {
        return record.name;
      },
    },
  ];

  const getCustomerContactsList = async () => {
    try {
      const respContacts: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}${path}?f[0][field]=module_id&f[0][operator]=equal&f[0][value]=${id}`,
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
  };

  useEffect(() => {
    if (id != 0) {
      getCustomerContactsList();
    }
  }, []);

  return (
    <>
      <Table columns={columns} dataSource={dataContacts} scroll={{ x: 800 }} rowKey="id" />
      <Modal
        centered
        footer={false}
        title="NỘI DUNG"
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={700}
      >
        {dataContacts[0]?.param &&
          Object.entries(JSON.parse(dataContacts[0]?.param)).map(([key, value]) => (
            <Row key={key} align={'middle'}>
              <Typography.Title level={5} style={{ margin: '0' }}>
                {key}: &nbsp;
              </Typography.Title>
              <Typography.Text>{value}</Typography.Text>
            </Row>
          ))}
      </Modal>
    </>
  );
};

export default CustomerInteractions;
