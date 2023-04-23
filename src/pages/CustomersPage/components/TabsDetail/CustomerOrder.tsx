import { EyeOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Table } from '@app/components/common/Table/Table';
import CustomPagination from '@app/components/customs/CustomPagination';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { Tooltip, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

interface IProps {
  id: number;
  handleDetailsOrder: any;
}

const CustomerOrder: React.FC<IProps> = ({ id, handleDetailsOrder }) => {
  const path = API_URL.ORDERS;
  const [dataContacts, setDataContacts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'orders.createdAt',
  });

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
  };

  const f = Object.entries(filter)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'right',
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center',
      render: (record: any) => {
        return (
          <Tooltip placement="bottom" title="Xem chi tiết">
            <Typography.Link onClick={() => handleDetailsOrder(record)}>
              <EyeOutlined style={{ color: '#000' }} />
            </Typography.Link>
          </Tooltip>
        );
      },
    },
    {
      title: 'Số hợp đồng',
      dataIndex: 'contract_no',
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'started_date',
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Mã đơn vị phát triển',
      dataIndex: 'shop_code',
    },
    {
      title: 'Tên đơn vị phát triển',
      dataIndex: 'shop_name',
    },
    {
      title: 'Mã nhân viên phát triển',
      dataIndex: 'am_code',
    },
    {
      title: 'Tên nhân viên phát triển',
      dataIndex: 'am_name',
    },
  ];

  const getCustomerContactsList = async () => {
    setIsLoading(true);
    try {
      const respContacts: IRespApiSuccess = await apiInstance.get(
        `${API_BASE_URL}${path}?f[0][field]=customer.id&f[0][operator]=equal&f[0][value]=${id}&${f}`,
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
    </>
  );
};

export default CustomerOrder;
