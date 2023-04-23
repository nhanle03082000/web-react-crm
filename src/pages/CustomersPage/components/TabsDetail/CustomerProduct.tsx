import { apiInstance } from '@app/api/app/api_core';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import { Table } from '@app/components/common/Table/Table';
import CustomPagination from '@app/components/customs/CustomPagination';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import FormProduct from '../Form/FormProduct';
import { CreateModal, UpdateModal } from './CustomerContacts';

interface IProps {
  id: number;
}

const CustomerProduct: React.FC<IProps> = ({ id }) => {
  const path = API_URL.CUSTOMERPRODUCTS;
  const [dataContacts, setDataContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'customer_products.createdAt',
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
      // title: t('tables.actions'),
      title: 'Hành động',
      dataIndex: 'actions',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Space>
            <UpdateModal path={path} page="giải pháp" getList={getCustomerContactsList} id={id} initValue={record}>
              <FormProduct isEditing={true} />
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
      title: 'Tên giải pháp',
      dataIndex: 'product',
      render: (record: { name: string; id: number }): string => {
        return record.name;
      },
    },
    {
      align: 'right',
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'employee',
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
      <CreateModal path={path} page="giải pháp" getList={getCustomerContactsList} id={id}>
        <FormProduct isEditing={false} />
      </CreateModal>
    </>
  );
};

export default CustomerProduct;
