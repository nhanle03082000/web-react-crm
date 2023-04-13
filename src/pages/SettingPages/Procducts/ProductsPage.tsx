import { apiInstance } from '@app/api/app/api_core';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import Crud from '@app/components/customs/crudv1/Crud';
import CustomLoading from '@app/components/customs/CustomLoading';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Products: React.FC = () => {
  const path = API_URL.PRODUCTS;
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    data: {
      id: 0,
      name: '',
      permission: '',
      description: '',
      is_active: false,
      createdAt: null,
      updatedAt: new Date(),
    },
    defaultInputValues: { name: '', code: '', description: '' },
  });

  const column = [
    {
      title: 'Mã',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'Tên nhóm',
      dataIndex: 'description',
      editable: true,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      editable: false,
      render: (record: any) => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      editable: false,
      render: (record: any) => {
        const date = new Date(record);
        return date.toLocaleDateString('en-GB');
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      editable: true,
    },
  ];
  const option = [
    {
      value: 'filter',
      label: 'Lọc theo trường',
      disabled: true,
    },
    {
      value: 'code',
      label: 'Mã',
    },
    {
      value: 'create_at',
      label: 'Ngày tạo',
    },
    {
      value: 'update_at',
      label: 'Ngày cập nhật',
    },
    {
      value: 'name',
      label: 'Tên',
    },
    {
      value: 'description',
      label: 'Mô tả',
    },
  ];

  const getDataByID = async (idData: number) => {
    setLoading(true);
    try {
      const respDataById: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}/${idData}`);
      if (respDataById.code === 200) {
        setState({
          ...state,
          data: respDataById?.data,
          defaultInputValues: {
            name: respDataById?.data?.name,
            code: respDataById?.data?.code,
            description: respDataById?.data?.description,
          },
        });
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
    setLoading(false);
  };
  return (
    <>
      <PageTitle>{t('namepage.nhomsanpham')}</PageTitle>
      <Crud
        checkPermission={'sjdhfjsdhfkj'}
        column={column}
        path={path}
        option={option}
        getDataByID={getDataByID}
        state={state}
        getDataModal={''}
        namePage={t('namepage.nhomsanpham')}
      >
        {loading ? (
          <CustomLoading />
        ) : (
          <>
            <Form.Item name="code" label="Mã nhóm">
              <Input placeholder="Nhập mã nhóm" size="small" />
            </Form.Item>
            <Form.Item name="name" label="Tên nhóm">
              <TextArea rows={4} placeholder="Nhập tên nhóm" size="small" />
            </Form.Item>
            <Form.Item name="description" label="Mô tả">
              <TextArea rows={4} placeholder="Viết mô tả" size="small" />
            </Form.Item>
          </>
        )}
      </Crud>
    </>
  );
};

export default Products;
