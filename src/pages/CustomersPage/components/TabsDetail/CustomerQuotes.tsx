import { EyeOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Table } from '@app/components/common/Table/Table';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IFilter, IRespApiSuccess } from '@app/interfaces/interfaces';
import { Space, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { ReactComponent as MailIcon } from '@app/assets/icons/mail.svg';
import { ColumnsType } from 'antd/es/table';
import CustomPagination from '@app/components/customs/CustomPagination';
import numeral from 'numeral';

interface IProps {
  id: number;
  handleDetailsQuotes: any;
}

const CustomerQuotes: React.FC<IProps> = ({ id, handleDetailsQuotes }) => {
  const path = API_URL.QUOTES;
  const [dataContacts, setDataContacts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<IFilter>({
    page: 1,
    limit: 20,
    total: 0,
    sort_direction: 'desc',
    sort_column: 'quotes.createdAt',
  });

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
  };

  const f = Object.entries(filter)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

  const sendMail = async (id: number) => {
    setIsLoading(true);
    console.log(id);
    try {
      const respUsers: IRespApiSuccess = await apiInstance.post(`${API_BASE_URL}${path}/send`, { id: id });
      if (respUsers.code === 200) {
        notificationController.success({
          message: 'Gửi thành công',
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
    setIsLoading(false);
  };

  const columns: ColumnsType = [
    {
      title: 'STT',
      dataIndex: 'stt',
      align: 'right',
    },
    {
      title: 'Hành động',
      align: 'center',
      dataIndex: 'id',
      render: (record: number) => {
        return (
          <Space>
            <Tooltip placement="bottom" title="Gởi email">
              <Typography.Link
                onClick={() => sendMail(record)}
                // style={checkPermission?.edit ? { display: 'unset' } : { display: 'none' }}
              >
                <MailIcon />
              </Typography.Link>
            </Tooltip>
            <Tooltip placement="bottom" title="Xem chi tiết">
              <Typography.Link
                onClick={() => handleDetailsQuotes(record)}
                // style={checkPermission?.edit ? { display: 'unset' } : { display: 'none' }}
              >
                <EyeOutlined style={{ color: '#000' }} />
              </Typography.Link>
            </Tooltip>
          </Space>
        );
      },
    },
    {
      title: 'Ngày báo giá',
      dataIndex: 'quote_date',
      align: 'right',
      render: (record: string): string => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
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
    {
      title: 'Thành tiền',
      align: 'right',
      dataIndex: 'total_amount',
      render: (record: number): string => {
        return `${numeral(record).format('0,0 đ')}đ`;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'is_sent',
      render: (record: boolean): string => {
        return record ? 'Đã gửi' : 'Chưa gửi';
      },
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

export default CustomerQuotes;
