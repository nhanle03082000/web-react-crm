import { EditOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { Modal } from '@app/components/common/Modal/Modal';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Table } from '@app/components/common/Table/Table';
import { Button } from '@app/components/common/buttons/Button/Button';
import CustomLoading from '@app/components/customs/CustomLoading';
import CustomPagination from '@app/components/customs/CustomPagination';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { startLoading, stopLoading } from '@app/utils/redux.util';
import { Form, Row, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import FormContact from '../Form/FormContact';

interface IProps {
  id: number;
}

const CustomerContacts: React.FC<IProps> = ({ id }) => {
  const path = API_URL.CUSTOMERCONTACTS;
  const [dataContacts, setDataContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'customer_contacts.createdAt',
  });

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
  };

  const f = Object.entries(filter)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

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

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'right',
    },
    {
      title: 'Thao tác',
      dataIndex: 'actions',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Space>
            <UpdateModal
              path={path}
              page="thông tin liên hệ"
              getList={getCustomerContactsList}
              id={id}
              initValue={record}
            >
              <FormContact isEditing={true} />
            </UpdateModal>
            <Popconfirm
              title="Bạn có muốn xoá không?"
              okText="Có"
              cancelText="Không"
              onConfirm={() => onDelete(record.id)}
            >
              <DeleteIcon style={{ color: 'red' }} />
            </Popconfirm>
          </Space>
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
      align: 'right',
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
      align: 'right',
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'employee',
      align: 'left',
      render: (record: { name: string; id: number }): string => {
        return record.name;
      },
    },
  ];

  const getCustomerContactsList = async () => {
    setIsLoading(true);
    try {
      const respContacts: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}${path}?f[0][field]=customer_id&f[0][operator]=contain&f[0][value]=${id}&${f}`,
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
    getCustomerContactsList();
  }, [filter.page]);

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
      <CreateModal path={path} page="thông tin liên hệ" getList={getCustomerContactsList} id={id}>
        <FormContact isEditing={false} />
      </CreateModal>
    </>
  );
};
interface IModal {
  path: string;
  page: string;
  getList: () => void;
  id: number;
  children: React.ReactChild;
  initValue?: any;
}

export const CreateModal: React.FC<IModal> = ({ path, page, getList, id, children }: any) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useAppSelector((state) => state.app.loading);
  const dispath = useAppDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const onCreate = async (values: any) => {
    dispath(startLoading);
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
    dispath(stopLoading);
    getList();
    handleCancel();
  };
  return (
    <>
      <Button className="button-create" onClick={showModal} type="primary">
        Thêm {page}
      </Button>
      <Modal
        title={`Thêm ${page}`}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        size="large"
        footer={null}
      >
        <>
          {isLoading && <CustomLoading />}
          <Form form={form} onFinish={onCreate} layout="vertical">
            {children}
            <Row gutter={[10, 0]} justify="end">
              <Button size="small" type="primary" htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Form>
        </>
      </Modal>
    </>
  );
};

export const UpdateModal: React.FC<IModal> = ({ path, page, getList, id, children, initValue }: any) => {
  console.log('initValue:', initValue);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useAppSelector((state) => state.app.loading);
  const dispath = useAppDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const onUpdate = async (values: any) => {
    dispath(startLoading);
    const data = {
      customer_id: id,
      is_active: true,
      ...values,
    };
    try {
      const respUsers: IRespApiSuccess = await apiInstance.put(`${API_BASE_URL}${path}/${initValue.id}`, data);
      if (respUsers.code === 200) {
        notificationController.success({
          message: 'Cập nhật thành công',
        });
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
    dispath(stopLoading);
    getList();
    handleCancel();
  };
  return (
    <>
      <EditOutlined onClick={showModal} title="Sửa" />
      <Modal
        title={`Sửa ${page}`}
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        size="large"
        footer={null}
        centered
      >
        <>
          {isLoading && <CustomLoading />}
          <Form form={form} onFinish={onUpdate} layout="vertical" initialValues={initValue}>
            {children}
            <Row gutter={[10, 0]} justify="end">
              <Button size="small" type="primary" htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default CustomerContacts;
