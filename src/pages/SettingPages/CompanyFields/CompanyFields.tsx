import { apiInstance } from '@app/api/app/api_core';
import { TextArea } from '@app/components/common/inputs/Input/Input';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import Crud from '@app/components/customs/crudv1/Crud';
import CustomLoading from '@app/components/customs/CustomLoading';
import { column } from '@app/components/customs/tables/columns';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { getRoleUser } from '@app/utils/redux.util';
import { Form, Input } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CompanyFields: React.FC = () => {
  const path = API_URL.COMPANYFIELDS;
  const userListPermission = JSON.parse(getRoleUser());
  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;

  const isEditing = useAppSelector((state) => state.app.editing);

  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    data: {
      id: 0,
      code: '',
      name: '',
      description: '',
      is_active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    defaultInputValues: { name: '', code: '', description: '' },
  });

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
      <PageTitle>{t('namepage.linhvuc')}</PageTitle>
      <Crud
        checkPermission={permission}
        column={column}
        path={path}
        option={option}
        getDataByID={getDataByID}
        state={state}
        getDataModal={''}
        namePage={t('namepage.linhvuc')}
      >
        {loading ? (
          <CustomLoading />
        ) : (
          <>
            <Form.Item name="code" label="Mã lĩnh vực">
              <Input placeholder="Nhập mã lĩnh vực" size="small" disabled={isEditing} />
            </Form.Item>
            <Form.Item name="name" label="Tên lĩnh vực">
              <TextArea rows={4} placeholder="Nhập tên lĩnh vực" size="small" />
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

export default CompanyFields;
