import { EyeOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { Table } from '@app/components/common/Table/Table';
import CustomPagination from '@app/components/customs/CustomPagination';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { appActions } from '@app/store/slices/appSlice';
import { Column, selectCustomerColumns, updateCustomerColumnStatus } from '@app/store/slices/columnSlice';
import { Popconfirm, Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DetailModal from './Details/DetailModal';

interface IProps {
  param: string | null;
  colums: any;
  children: React.ReactNode;
  setListIdLead?: any;
}

const Show: React.FC<IProps> = ({ param, colums, setListIdLead }) => {
  const { path, show } = useContext(DataContext);
  const [dataShow, setDataShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'customers.createdAt',
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
        dispatch(appActions.getDataTable(respUsers.data.collection));
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
    // if (checkPermission?.delete) {
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
    navigate(`/customers/${id}`);
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
              <DeleteIcon title="Xoá dữ liệu" style={{ fontSize: '20px', cursor: 'pointer' }} />
            </Popconfirm>
            <EyeOutlined
              title="Xem chi tiết"
              style={{ fontSize: '20px', cursor: 'pointer' }}
              onClick={() => handleClick(record.id)}
            />
          </Space>
        );
      },
    },
    {
      title: 'Mã số thuế',
      render: (record: any) => {
        return <DetailModal id={record.id} contentButton={record.tax_code} />;
      },
    },
  ];
  columns.push(...colums);

  useEffect(() => {
    onShow();
  }, [param, filter.page, show]);

  const handleSelectChange = (selectedRowKeys: React.Key[]) => {
    setListIdLead(selectedRowKeys);
  };
  const rowSelection = {
    onChange: handleSelectChange,
  };
  const dispatch = useDispatch();

  const columnss = useSelector(selectCustomerColumns);

  const col = columnss.map((item: { name: string; status: boolean }) => {
    if (item.status) {
      return item.name;
    }
  });

  useEffect(() => {
    const savedColumns = localStorage.getItem('customerColumns');
    if (savedColumns) {
      const parsedColumns = JSON.parse(savedColumns);
      parsedColumns.forEach((column: Column, index: number) => {
        dispatch(updateCustomerColumnStatus({ index, checked: column.status }));
      });
    }
  }, [dispatch]);

  return (
    <>
      <Table
        columns={columns.filter((column: any) => col.includes(column.title))}
        dataSource={dataShow}
        pagination={false}
        scroll={{ x: 800 }}
        loading={isLoading}
        rowKey="id"
        rowSelection={rowSelection}
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
