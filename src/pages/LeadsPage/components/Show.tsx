import { EyeOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Table } from '@app/components/common/Table/Table';
import CustomPagination from '@app/components/customs/CustomPagination';
import Delete from '@app/components/customs/crud/Delete';
import { API_BASE_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { Space } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DetailModal from '../../LeadsPage/components/Details/DetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { Column, selectLeadColumns, updateLeadColumnStatus } from '@app/store/slices/columnSlice';
import { appActions } from '@app/store/slices/appSlice';
import { H4 } from '@app/components/common/typography/H4/H4';

interface IProps {
  param: string | null;
  colums: any;
  children: React.ReactNode;
  setListIdLead: any;
  permission: any;
}

const Show: React.FC<IProps> = ({ param, colums, setListIdLead, permission }) => {
  const { path, show } = useContext(DataContext);
  const [dataShow, setDataShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'leads.createdAt',
  });
  const dispatch = useDispatch();

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

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
  };

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/leads/${id}`);
  };

  const columns: any = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'right',
    },
    {
      title: 'Thao tác',
      align: 'center',
      render: (record: any) => {
        return (
          <Space>
            {permission.delete && <Delete onShow={onShow} id={record.id} />}
            {permission.show && (
              <EyeOutlined
                title="Xem chi tiết"
                style={{ fontSize: '20px', cursor: 'pointer' }}
                onClick={() => handleClick(record.id)}
              />
            )}
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

  const columnss = useSelector(selectLeadColumns);

  const col = columnss.map((item: { name: string; status: boolean }) => {
    if (item.status) {
      return item.name;
    }
  });

  useEffect(() => {
    const savedColumns = localStorage.getItem('leadColumns');
    if (savedColumns) {
      const parsedColumns = JSON.parse(savedColumns);
      parsedColumns.forEach((column: Column, index: number) => {
        dispatch(updateLeadColumnStatus({ index, checked: column.status }));
      });
    }
  }, [dispatch]);

  return dataShow.length > 0 ? (
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
  ) : (
    <H4>Chưa có dữ liệu</H4>
  );
};

export default Show;
