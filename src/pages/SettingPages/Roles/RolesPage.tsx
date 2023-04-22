import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { H3 } from '@app/components/common/typography/H3/H3';
import Create from '@app/components/customs/crud/Create';
import Show from '@app/components/customs/crud/Show';
import ExportExcel from '@app/components/customs/exportexcel/ExportExcel';
import Filter from '@app/components/customs/filter/Filter';
import { roleColumn } from '@app/components/customs/tables/columns';
import { API_URL } from '@app/configs/api-configs';
import { rolefilter } from '@app/configs/filter-configs';
import { DataContext } from '@app/contexts/DataContext';
import { getRoleUser } from '@app/utils/redux.util';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RoleForm from './components/RoleForm';

const Roles: React.FC = () => {
  const { t } = useTranslation();
  const path = API_URL.ROLES;
  const page = t('namepage.vaitro');
  const userListPermission = JSON.parse(getRoleUser());
  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [param, setParam] = useState('');
  const [show, setShow] = useState(false);
  const [state, setState] = useState<any>({
    data: {},
    rolePermission: [],
    defaultInputValues: {},
  });

  const initialFilter = [
    { field: 'id', operator: 'contain', value: '' },
    { field: 'name', operator: 'contain', value: '' },
  ];

  return (
    <DataContext.Provider value={{ path, page, state, setState, isLoad, setIsLoad, show, setShow }}>
      <PageTitle>{page}</PageTitle>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card padding="1rem">
            <Row justify={'space-between'}>
              <Col span={4}>
                <H3 className="typography-title">{page}</H3>
              </Col>
              <Col span={6}>
                <Row justify="end" gutter={6}>
                  <Col>{permission.export && <ExportExcel param={param} />}</Col>
                  <Col>
                    {permission.create && (
                      <Create>
                        <RoleForm isEditing={false} />
                      </Create>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={24}>
                <Filter initialValue={initialFilter} option={rolefilter} setParam={setParam} />
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
