import { apiInstance } from '@app/api/app/api_core';
import { Table } from '@app/components/common/Table/Table';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { Space } from 'antd';
import React, { memo, useContext, useEffect, useState } from 'react';
import CustomPagination from '../CustomPagination';
import Delete from './Delete';
import Update from './Update';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { startLoading, stopLoading } from '@app/utils/redux.util';

interface IProps {
  param: string | null;
  colums: any;
  children: React.ReactNode;
  permission: any;
  sortColumn?: string;
}

const Show: React.FC<IProps> = ({ children, param, colums, permission, sortColumn }) => {
  const { path, show } = useContext(DataContext);
  const [showData, setShowData] = useState([]);
  const isLoading = useAppSelector((state) => state.app.loading);
  const dispath = useAppDispatch();
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: sortColumn ? sortColumn : 'created_at',
  });

  const f = Object.entries(filter)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

  const onShow = async () => {
    dispath(startLoading);
    try {
      const respUsers: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}`, {
        params: param ? `${param}&${f}` : f,
      });
      if (respUsers.code === 200) {
        setFilter({ ...filter, total: respUsers.data.total });
        setShowData(respUsers.data.collection);
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    dispath(stopLoading);
  };

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
  };

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right',
      render: (_text: any, _record: any, index: any) => index + 1,
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (record: any) => {
        return (
          <Space>
            {path != '/users' ? permission.delete && <Delete id={record.id} onShow={onShow} /> : ''}
            {permission.edit && <Update id={record.id}>{children}</Update>}
          </Space>
        );
      },
    },
  ];
  columns.push(...colums);

  useEffect(() => {
    onShow();
  }, [param, filter.page, show]);

  return (
    <>
      <Table
        columns={columns}
        dataSource={showData}
        pagination={false}
        scroll={{ x: 800 }}
        loading={isLoading}
        rowKey="id"
      />
      <CustomPagination
        totalItems={filter.total}
        itemsPerPage={filter.limit}
        currentPage={filter.page}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default memo(Show);
