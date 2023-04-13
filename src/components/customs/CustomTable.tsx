import { BasicTableRow } from '@app/api/table.api';
import { notificationController } from '@app/controllers/notificationController';
import { Form } from 'antd';
import Typography from 'antd/lib/typography';
import React, { useState } from 'react';
import { Popconfirm } from '../common/Popconfirm/Popconfirm';
import * as S from './Custom.styles';
import { EditTableCell } from './tables/EditTableCell';
import { Space } from '../common/inputs/SearchInput/SearchInput.styles';

interface IProps {
  tableData: BasicTableRow[];
  deleteData: any;
  updateData: any;
  onEditRow: any;
  column: any;
  checkPermission: any;
  loading: boolean;
}

interface Item {
  id: string;
  title: string;
  dataIndex: string;
}

export const CustomTable: React.FC<IProps> = ({
  tableData,
  deleteData,
  updateData,
  column,
  onEditRow,
  checkPermission,
  loading,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.id === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;
      updateData(row, key);
      setEditingKey('');
    } catch (errInfo) {
      notificationController.success({
        message: errInfo,
      });
    }
  };

  //xoá người dùng theo id
  const handleDeleteRow = (rowId: string) => {
    deleteData(rowId);
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
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Lưu
            </Typography.Link>
            <Popconfirm title="Bạn có muốn huỷ không?" okText="Có" cancelText="Không" onConfirm={cancel}>
              <Typography.Link>Huỷ</Typography.Link>
            </Popconfirm>
          </>
        ) : (
          <Space>
            <Typography.Link
              disabled={editingKey !== ''}
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
              <Typography.Link
                disabled={editingKey !== ''}
                style={checkPermission?.delete ? { display: 'unset' } : { display: 'none' }}
              >
                <S.Delete />
              </Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  columns.push(...column);

  /* ------------------------------------- */
  const mergedColumns = columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  /* ------------------------------------- */

  return (
    <Form form={form} component={false}>
      <S.CustomTable
        components={{
          body: {
            cell: EditTableCell,
          },
        }}
        columns={mergedColumns}
        dataSource={tableData}
        pagination={false}
        scroll={{ x: 800 }}
        loading={loading}
        rowKey="id"
      />
    </Form>
  );
};
