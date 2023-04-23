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
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import FormTask from '../Form/FormTask';
import { CreateModal, UpdateModal } from './CustomerContacts';

interface IProps {
  employee_id: number;
  customer_id: number;
}

const CustomerTask: React.FC<IProps> = ({ employee_id, customer_id }) => {
  const path = API_URL.CUSTOMERTASK;
  const [dataContacts, setDataContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    },
    {
      // title: t('tables.actions'),
      title: 'Thao tác',
      dataIndex: 'actions',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Space>
            <UpdateModal
              path={path}
              page="công việc"
              getList={getCustomerContactsList}
              id={customer_id}
              initValue={{
                ...record,
                start_time: moment(record.start_time),
                end_time: moment(record.end_time),
                status: record.status ? 1 : 0,
              }}
            >
              <FormTask isEditing={true} />
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
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_time',
      align: 'right',
      render: (record: string): string => {
        const date = new Date(record);
        return moment(date).format('DD/MM/YYYY HH:mm:ss');
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
      <CreateModal path={path} page="công việc" getList={getCustomerContactsList} id={customer_id}>
        <FormTask isEditing={false} />
      </CreateModal>
    </>
  );
};

export default CustomerTask;
