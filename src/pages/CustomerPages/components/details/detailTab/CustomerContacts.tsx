import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Modal } from '@app/components/common/Modal/Modal';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Col, Form, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

interface IProps {
  id: number;
}

const CustomerContacts: React.FC<IProps> = ({ id }) => {
  const [form] = Form.useForm();
  const path = API_URL.CUSTOMERCONTACTS;
  const [dataContacts, setDataContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreate = async (values: any) => {
    const data = {
      customer_id: id,
      is_active: true,
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
      title: 'Thao tác',
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
      title: 'Họ tên người đại diện',
      dataIndex: 'name',
    },
    {
      title: 'SĐT di động',
      dataIndex: 'phone',
    },
    {
      title: 'Email cá nhân',
      dataIndex: 'email',
    },
    {
      title: 'Chức danh',
      dataIndex: 'position',
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
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
        title="THÊM THÔNG TIN LIÊN HỆ"
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={700}
      >
        <Form form={form} onFinish={onCreate} autoComplete="off" layout="vertical">
          <Row gutter={[12, 0]}>
            <Col span={24}>
              <Form.Item
                label="Họ tên người liên hệ"
                name="name"
                rules={[{ required: true, message: 'Họ tên không được để trống' }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SĐT di động"
                name="phone"
                rules={[{ required: true, message: 'SĐT không được để trống' }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Chức danh" name="position" initialValue={''}>
                <Input placeholder="Nhập chức danh" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email cá nhân" name="email" initialValue={''}>
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Phòng ban" name="department" initialValue={''}>
                <Input placeholder="Nhập phòng ban" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description" initialValue={''}>
                <Input placeholder="Nhập mô tả" />
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

export default CustomerContacts;
