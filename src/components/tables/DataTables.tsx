import { BasicTableRow } from '@app/api/table.api';
import { notificationController } from '@app/controllers/notificationController';
import { ITableData } from '@app/interfaces/interfaces';
import { Form, TablePaginationConfig } from 'antd';
import Typography from 'antd/lib/typography';
import { Table } from 'components/common/Table/Table';
import { DefaultRecordType, Key } from 'rc-table/lib/interface';
import React, { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../common/inputs/Input/Input';
import { InputNumber } from '../common/inputs/InputNumber/InputNumber';
import { Popconfirm } from '../common/Popconfirm/Popconfirm';

interface IProps {
  tableData: BasicTableRow[];
  setTableData: any;
  deleteData: any;
  updateData: any;
  getDataByID: any;
}

interface Item {
  id: string;
  title: string;
  dataIndex: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const DataTables: React.FC<IProps> = ({ tableData, setTableData, deleteData, updateData, getDataByID }) => {
  const { t } = useTranslation();
  const handleTableChange = (pagination: TablePaginationConfig) => {
    console.log(pagination);
  };

  /* ------------------------------------- */
  const handleRowClick = (record: any, e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    // console.log('clicked');
    // getDataByID(record.id);
  };
  /* ------------------------------------- */

  /* ------------------------------------------------- */
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.id === editingKey;

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id);
  };

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

  /* ------------------------------------------------- */

  //xoá người dùng theo id
  const handleDeleteRow = (rowId: string) => {
    setTableData(tableData.filter((item: any) => item.id !== rowId));
    deleteData(rowId);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: Key[], selectedRows: DefaultRecordType[]) => {
      console.log(selectedRowKeys, selectedRows);
    },
    onSelect: (record: DefaultRecordType, selected: boolean, selectedRows: DefaultRecordType[]) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: boolean, selectedRows: DefaultRecordType[]) => {
      console.log(selected, selectedRows);
    },
  };
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      // title: t('tables.actions'),
      title: 'Thao tác',
      dataIndex: 'actions',
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.id)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            &nbsp;
            <Typography.Link disabled={editingKey !== ''} onClick={() => handleDeleteRow(record.id)}>
              Xoá
            </Typography.Link>
          </span>
        );
      },
    },
    {
      // title: t('common.name'),
      title: 'Mã nhóm',
      dataIndex: 'code',
      editable: true,
    },
    {
      // title: t('common.age'),
      title: 'Mô tả',
      dataIndex: 'description',
      // sorter: (a: BasicTableRow, b: BasicTableRow) => a.age - b.age,
      // showSorterTooltip: false,
      editable: true,
    },
    {
      // title: t('common.address'),
      title: 'Trạng thái',
      dataIndex: 'is_active',
      editable: true,
      render(text: boolean) {
        return <div>{text === true ? 'OK' : 'Chưa kích hoạt'}</div>;
      },
    },
  ];

  /* ------------------------------------- */
  const mergedColumns = columns.map((col) => {
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
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        columns={mergedColumns}
        dataSource={tableData}
        rowSelection={{ ...rowSelection }}
        pagination={false}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
        rowKey="id"
        // onRow={(record) => ({
        //   onClick: (e) => handleRowClick(record, e),
        // })}
      />
    </Form>
  );
};
