import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import { getProductGroupList } from '@app/api/app/api';
import { apiInstance } from '@app/api/app/api_core';
import { Modal } from '@app/components/common/Modal/Modal';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Col, Form, Input, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  id: number;
}

const CustomerProduct: React.FC<IProps> = ({ id }) => {
  const [form] = Form.useForm();
  const path = API_URL.CUSTOMERPRODUCTS;
  const [dataContacts, setDataContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState([]);

  const showModal = async () => {
    setIsModalOpen(true);
    const productList = await getProductGroupList();
    setProduct(productList);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreate = async (values: any) => {
    const data = {
      customer_id: id,
      ...values,
    };
    try {
      const respUsers: IRespApiSuccess = await apiInstance.post(`${API_BASE_URL}${path}`, data);
      if (respUsers.code === 200) {
        notificationController.success({
          message: 'Tạo thành công',
        });
        getCustomerContactsList();
        handleCancel();
      } else {
        notificationController.error({
          message: respUsers.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  const onDelete = async (idData: number) => {
    // if (checkPermission?.delete) {
    try {
      const respDelete: IRespApiSuccess = await apiInstance.delete(`${API_BASE_URL}${path}/${idData}`);
      if (respDelete.code === 200) {
        notificationController.success({
          message: 'Xoá thành công',
        });
        getCustomerContactsList();
      } else {
        notificationController.error({
          message: respDelete.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    // }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      // title: t('tables.actions'),
      title: 'Hành động',
      dataIndex: 'actions',
      render: (_: any, record: any) => {
        return (
          <Popconfirm
            title="Bạn có muốn xoá không?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => onDelete(record.id)}
          >
            <Typography.Link
            //  style={checkPermission?.delete ? { display: 'unset' } : { display: 'none' }}
            >
              <RestOutlined style={{ color: 'red' }} />
            </Typography.Link>
          </Popconfirm>
        );
      },
    },
    {
      title: 'Mã giải pháp',
      dataIndex: 'product',
      render: (record: { name: string; id: number }): number => {
        return record.id;
      },
    },
    {
      title: 'Tên giải pháp',
      dataIndex: 'product',
      render: (record: { name: string; id: number }): string => {
        return record.name;
      },
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
      dataIndex: 'employee',
      render: (record: { name: string; id: number }): string => {
        return record.name;
      },
    },
  ];

  const getCustomerContactsList = async () => {
    try {
      const respContacts: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}${path}?f[0][field]=customer_id&f[0][operator]=contain&f[0][value]=${id}`,
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
      <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
        Thêm
      </Button>
      <Modal
        centered
        footer={false}
        title="THÊM GIẢI PHÁP"
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={700}
      >
        <Form form={form} onFinish={onCreate} autoComplete="off" layout="vertical">
          <Row gutter={[12, 0]}>
            <Col span={24}>
              <Form.Item
                label="Tên giải pháp"
                name="product_id"
                rules={[{ required: true, message: 'Giải pháp không được để trống' }]}
              >
                <Select options={product} placeholder="Chọn giải pháp" />
              </Form.Item>
              <Form.Item label="Mô tả" name="description">
                <Input placeholder="Nhập mô tả" defaultValue={''} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[10, 0]} justify="start" className="footer">
            <Button size="small" type="primary" htmlType="submit">
              Lưu
            </Button>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CustomerProduct;
