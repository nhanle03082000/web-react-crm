import { EyeOutlined, RestOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { Table } from '@app/components/common/Table/Table';
import CustomPagination from '@app/components/customs/CustomPagination';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { Popconfirm, Space, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  param: string | null;
  colums: any;
  children: React.ReactNode;
  setListIdLead?: any;
  visibleColumns?: any;
  path: string;
}

const Show: React.FC<IProps> = ({ param, colums, path }) => {
  const { isLoad } = useContext(DataContext);
  const [dataShow, setDataShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'orders.createdAt',
  });

  const f = Object.entries(filter)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

  const onShow = async () => {
    setIsLoading(true);
    try {
      const respUsers: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}`, {
        params: param ? `${param}&${f}` : f,
      });
      if (respUsers.code === 200) {
        setFilter({ ...filter, total: respUsers.data.total });
        respUsers.data.collection.map((item: any, index: number) => {
          return (item.stt = index + 1);
        });
        setDataShow(respUsers.data.collection);
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setIsLoading(false);
  };

  const onDelete = async (idData: number) => {
    console.log(idData);
    try {
      const respDelete: IRespApiSuccess = await apiInstance.delete(`${API_BASE_URL}${path}/${idData}`);
      if (respDelete.code === 200) {
        notificationController.success({
          message: 'Xoá thành công',
        });
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
    onShow();
  };

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
  };

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`${path}/${id}`);
  };

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (record: any) => {
        return (
          <Space>
            <Popconfirm
              title="Bạn có muốn xoá không?"
              okText="Có"
              cancelText="Không"
              onConfirm={() => onDelete(record.id)}
            >
              <DeleteIcon />
            </Popconfirm>
            <EyeOutlined
              title="Chi tiết"
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={() => handleClick(record.id)}
            />
          </Space>
        );
      },
    },
  ];
  columns.push(...colums);

  useEffect(() => {
    onShow();
  }, [param, filter.page, isLoad]);

  return (
    <>
      <Table
        // columns={columns.filter((column: any) => visibleColumns.includes(column.title))}
        columns={columns}
        dataSource={dataShow}
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

export default Show;
