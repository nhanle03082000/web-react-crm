import { BasicTableRow } from '@app/api/table.api';
import { Popconfirm } from '@app/components/common/Popconfirm/Popconfirm';
import * as S from '@app/components/customs/Custom.styles';
import * as S1 from '../Leads.styles';
import Typography from 'antd/lib/typography';
import React, { useState } from 'react';
import ModalDetails from './Details/ModalDetails';
import { Space } from 'antd';

interface IProps {
  tableData: BasicTableRow[];
  deleteData: any;
  checkPermission: any;
  loading: boolean;
  visibleColumns: any;
  setIsDetail: any;
  getDataByID: any;
  onEditRow: any;
  setListIdLead: any;
}

export const Table: React.FC<IProps> = ({
  tableData,
  deleteData,
  checkPermission,
  loading,
  onEditRow,
  visibleColumns,
  setIsDetail,
  getDataByID,
  setListIdLead,
}) => {
  //xoá người dùng theo id
  const handleDeleteRow = (rowId: string) => {
    deleteData(rowId);
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isStt, setIsStt] = useState<number>(0);
  const showModal = (id: number) => {
    setIsModalOpen(true);
    getDataByID(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      // title: t('tables.actions'),
      title: 'Thao tác',
      dataIndex: 'actions',
      render: (_: any, record: any) => {
        return (
          <Space>
            <Typography.Link
              onClick={() => onEditRow(true, record.id)}
              style={checkPermission?.edit ? { display: 'unset' } : { display: 'none' }}
            >
              <S.Edit />
            </Typography.Link>
            <Popconfirm
              title="Bạn có muốn xoá không?"
              okText="Có"
              cancelText="Không"
              onConfirm={() => handleDeleteRow(record.id)}
            >
              <Typography.Link style={checkPermission?.delete ? { display: 'unset' } : { display: 'none' }}>
                <S.Delete />
              </Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
    {
      title: 'Mã số thuế',
      dataIndex: 'tax_code',
      render: (_: any, record: any) => {
        return (
          <>
            <Typography.Link onClick={() => (showModal(record.id), setIsStt(record.stt - 1))}>
              <S1.ButtonTax>{record.tax_code}</S1.ButtonTax>
            </Typography.Link>
          </>
        );
      },
    },
    {
      title: 'Doanh nghiệp',
      dataIndex: 'company_name',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
    },
    {
      title: 'SĐT di động',
      dataIndex: 'phone_number',
    },
    {
      title: 'SĐT doanh nghiệp',
      dataIndex: 'headquarters_phone',
    },
    {
      title: 'Email doanh nghiệp',
      dataIndex: 'headquarters_email',
    },
    {
      title: 'Email cá nhân',
      dataIndex: 'email',
    },
    {
      title: 'Nhân viên phụ trách',
      dataIndex: 'employee',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
    {
      title: 'Nguồn gốc',
      dataIndex: 'customer_source',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
    {
      title: 'Lĩnh vực hoạt động',
      dataIndex: 'company_field',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
    {
      title: 'Quy trình bán hàng',
      dataIndex: 'sale_process',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
    {
      title: 'Địa chỉ trụ sở chính',
      dataIndex: 'headquarters_address',
    },
    {
      title: 'Tỉnh/Thành phố',
      dataIndex: 'province',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
    {
      title: 'Quận/Huyện',
      dataIndex: 'district',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
    {
      title: 'Phường/Xã',
      dataIndex: 'area',
      render: (record: { id: number; name: string }): string => {
        return record.name;
      },
    },
  ];

  const handleSelectChange = (selectedRowKeys: React.Key[]) => {
    setListIdLead(selectedRowKeys);
  };
  const rowSelection = {
    onChange: handleSelectChange,
  };

  return (
    <>
      <S.CustomTable
        columns={columns.filter((column) => visibleColumns.includes(column.title))}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 800 }}
        loading={loading}
        rowKey="id"
        rowSelection={rowSelection}
      />
      <S1.ModalStyle
        title="Xem tiềm năng"
        open={isModalOpen}
        maskClosable={false}
        size="large"
        footer={null}
        onCancel={handleCancel}
      >
        <ModalDetails detail={tableData[isStt]} setShowDetail={setIsDetail} />
      </S1.ModalStyle>
    </>
  );
};
