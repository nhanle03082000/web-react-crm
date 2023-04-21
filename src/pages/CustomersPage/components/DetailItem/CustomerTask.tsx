import { EditOutlined, PlusOutlined, RestOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Modal } from '@app/components/common/Modal/Modal';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import CustomPagination from '@app/components/customs/CustomPagination';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { Checkbox, Col, DatePicker, Form, Row, Space, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(0);
  const [conTent, setConTent] = useState<any>([]);

  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'tasks.createdAt',
  });

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
  };

  const f = Object.entries(filter)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

  const showModal = (edit: boolean) => {
    setIsEdit(edit);
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

  const onUpdate = async (values: any) => {
    const data = {
      customer_id: customer_id,
      is_active: true,
      start_time: moment(new Date(values.start_time).toUTCString()).format('YYYY-MM-DD HH:mm:ss'),
      end_time: moment(new Date(values.end_time).toUTCString()).format('YYYY-MM-DD HH:mm:ss'),
      status: values.status ? 1 : 0,
      ...values,
    };
    try {
      const completed: IRespApiSuccess = await apiInstance.put(`${API_BASE_URL}${path}/${idEdit}`, data);
      if (completed.code === 200) {
        notificationController.success({
          message: 'Thành công',
        });
        getCustomerContactsList();
      } else {
        notificationController.error({
          message: completed.message,
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      // title: t('tables.actions'),
      title: 'Thao tác',
      dataIndex: 'actions',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Space>
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

            <Typography.Link>
              <EditOutlined
                onClick={() => {
                  showModal(true),
                    setIdEdit(record.id),
                    setConTent({
                      ...record,
                      start_time: moment(record.start_time),
                      end_time: moment(record.end_time),
                      status: record.status === 0 ? false : true,
                    });
                }}
              />
            </Typography.Link>
          </Space>
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
      align: 'right',
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_time',
      align: 'right',
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'right',
      render: (record: number): any => {
        switch (record) {
          case 0:
            return 'Đang thực hiện';
            break;
          case 1:
            return 'Hoàn thành';
            break;
          case 2:
            return 'Quá hạn';
            break;
          default:
            break;
        }
      },
    },
  ];

  const getCustomerContactsList = async () => {
    setIsLoading(true);
    try {
      const respContacts: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}${path}?f[0][field]=customer_id&f[0][operator]=equal&f[0][value]=${customer_id}&${f}`,
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
    if (employee_id != 0) {
      getCustomerContactsList();
    }
  }, []);

  const [startDate, setStartDate] = useState<any>('');

  const onChangeStartDate = (date: any) => {
    setStartDate(date);
  };

  const disabledDate = (current: any) => {
    // Disable all dates that are before the current date
    return current && current < startDate;
  };

  const disabledDateStart = (current: any) => {
    if (!current) return false;

    // Trả về true cho các ngày trước ngày hiện tại
    return current < moment().startOf('day');
  };

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
      <Button type="primary" onClick={() => showModal(false)} icon={<PlusOutlined />}>
        Thêm
      </Button>
      <Modal
        centered
        footer={false}
        title={isEdit ? 'SỬA THÔNG TIN LIÊN HỆ' : 'THÊM THÔNG TIN LIÊN HỆ'}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width={700}
      >
        <Form
          form={form}
          onFinish={isEdit ? onUpdate : onCreate}
          autoComplete="off"
          layout="vertical"
          initialValues={isEdit ? conTent : ''}
        >
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
                <DatePicker format="L" showTime onChange={onChangeStartDate} disabledDate={disabledDateStart} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ngày kế thúc" name="end_time">
                <DatePicker format="L" showTime disabledDate={disabledDate} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Trạng thái" valuePropName="checked" name="status">
                <Checkbox>Hoàn thành</Checkbox>
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
