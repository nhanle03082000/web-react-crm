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
import { columnSouce } from '@app/components/customs/tables/columns';
import CompanyCareersForm from './components/CompanyCareersForm';
import { filter } from '@app/configs/filter-configs';

const CompanyCareers: React.FC = () => {
  const { t } = useTranslation();
  const path = API_URL.COMPANYCAREERS;
  const page = t('namepage.nganhnghe');
  const userListPermission = JSON.parse(getRoleUser());
  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const [param, setParam] = useState('');
  const [show, setShow] = useState(false);
  const [state, setState] = useState<any>({
    data: {},
    defaultInputValues: {},
  });

  const initialValue = [
    { field: 'name', operator: 'contain', value: '' },
    { field: 'description', operator: 'contain', value: '' },
  ];

  return (
    <DataContext.Provider value={{ path, page, state, setState, show, setShow }}>
      <PageTitle>{page}</PageTitle>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card padding="1rem">
            <Row justify={'space-between'}>
              <Col span={12}>
                <H3 className="typography-title">{page}</H3>
              </Col>
              <Col span={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {permission.export && <ExportExcel param={param} />} &nbsp;&nbsp;
                  {permission.create && (
                    <Create>
                      <CompanyCareersForm />
                    </Create>
                  )}
                </div>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={24}>
                <Filter initialValue={initialValue} option={filter} setParam={setParam} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card padding="1rem">
            {permission.index && (
              <Show param={param} colums={columnSouce} permission={permission}>
                <CompanyCareersForm />
              </Show>
            )}
          </Card>
        </Col>
      </Row>
    </DataContext.Provider>
  );
};

export default CompanyCareers;
