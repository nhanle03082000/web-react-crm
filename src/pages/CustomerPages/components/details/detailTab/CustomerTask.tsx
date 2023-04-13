import { PlusOutlined, RestOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Modal } from '@app/components/common/Modal/Modal';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { DatePicker } from '@app/components/common/pickers/DatePicker';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Col, Form, Row, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

interface IProps {
  employee_id: number;
  customer_id: number;
}

const CustomerTask: React.FC<IProps> = ({ employee_id, customer_id }) => {
  const [form] = Form.useForm();
  const path = API_URL.CUSTOMERTASK;
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
      customer_id: customer_id,
      is_active: true,
      start_time: moment(new Date(values.start_time).toUTCString()).format('YYYY-MM-DD HH:mm:ss'),
      end_time: moment(new Date(values.end_time).toUTCString()).format('YYYY-MM-DD HH:mm:ss'),
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
      title: 'Tiêu đề công việc',
      dataIndex: 'title',
    },
    {
      title: 'Nội dung công việc',
      dataIndex: 'content',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'start_time',
      editable: false,
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_time',
      editable: false,
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
  ];

  const getCustomerContactsList = async () => {
    try {
      const respContacts: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}`);
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
    if (employee_id != 0) {
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
                label="Tiêu đề công việc"
                name="title"
                rules={[{ required: true, message: 'Tiêu đề công việc không được để trống' }]}
              >
                <Input placeholder="Nhập tiêu đề công việc" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Nội dung công việc"
                name="content"
                rules={[{ required: true, message: 'Nội dung công việc không được để trống' }]}
              >
                <Input placeholder="Nhập nội dung công việc" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày bắt đầu" name="start_time">
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày kế thúc" name="end_time">
                <DatePicker />
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

export default CustomerTask;