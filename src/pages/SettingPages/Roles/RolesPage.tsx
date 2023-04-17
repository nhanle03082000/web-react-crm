import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { H3 } from '@app/components/common/typography/H3/H3';
import Create from '@app/components/customs/crud/Create';
import Show from '@app/components/customs/crud/Show';
import ExportExcel from '@app/components/customs/exportexcel/ExportExcel';
import Filter from '@app/components/customs/filter/Filter';
import { API_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { getRoleUser } from '@app/utils/redux.util';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoleForm from './components/RoleForm';
import { roleColumn } from '@app/components/customs/tables/columns';

const Roles: React.FC = () => {
  const { t } = useTranslation();
  const path = API_URL.ROLES;
  const page = t('namepage.vaitro');
  const userListPermission = JSON.parse(getRoleUser());
  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [param, setParam] = useState('');
  const [state, setState] = useState<any>({
    data: {},
    rolePermission: [],
    defaultInputValues: {},
  });

  const option = [
    {
      value: 'id',
      label: 'ID vai trò',
      type: 'string',
    },
    {
      value: 'code',
      label: 'Mã vai trò',
      type: 'string',
    },
    {
      value: 'name',
      label: 'Tên',
      type: 'string',
    },
    {
      value: 'description',
      label: 'Mô tả',
      type: 'string',
    },
    {
      value: 'createdAt',
      label: 'Ngày tạo',
      type: 'datetime',
    },
    {
      value: 'updatedAt',
      label: 'Ngày cập nhật',
      type: 'datetime',
    },
  ];

  const initialValue = [
    { field: 'code', operator: 'contain', value: '' },
    { field: 'name', operator: 'contain', value: '' },
  ];

  return (
    <DataContext.Provider value={{ path, page, state, setState, isLoad, setIsLoad }}>
      <PageTitle>{page}</PageTitle>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card padding="1rem">
            <Row justify={'space-between'}>
              <Col span={4}>
                <H3 className="typography-title">{page}</H3>
              </Col>
              <Col span={3}>
                <div style={{ display: 'flex', width: '100%', gap: '10px', justifyContent: 'flex-end' }}>
                  {permission.export && <ExportExcel param={param} />}
                  {permission.create && (
                    <Create>
                      <RoleForm isEditing={false} />
                    </Create>
                  )}
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={24}>
                <Filter initialValue={initialValue} option={option} setParam={setParam} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card padding="1rem">
            {permission.index && (
              <Show param={param} colums={roleColumn} permission={permission}>
                <RoleForm isEditing={true} />
              </Show>
            )}
          </Card>
        </Col>
      </Row>
    </DataContext.Provider>
  );
};

export default Roles;
