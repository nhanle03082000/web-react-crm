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
import { saleColumn } from '@app/components/customs/tables/columns';
import SaleForm from './SaleForm';
import { saleFilter } from '@app/configs/filter-configs';

const SaleProcesses: React.FC = () => {
  const { t } = useTranslation();
  const path = API_URL.SALEPROCESSES;
  const page = t('namepage.quytrinhbanhang');
  const userListPermission = JSON.parse(getRoleUser());
  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const [show, setShow] = useState<boolean>(false);
  const [param, setParam] = useState('');
  const [state, setState] = useState<any>({
    data: {},
    defaultInputValues: {},
  });

  const initialFilter = [
    { field: 'name', operator: 'contain', value: '' },
    { field: 'sale_process_index', operator: 'contain', value: '' },
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
                <Row justify="end" gutter={6}>
                  {permission.export && <ExportExcel param={param} />}&nbsp;&nbsp;
                  {permission.create && (
                    <Create>
                      <SaleForm />
                    </Create>
                  )}
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col span={24}>
                <Filter initialValue={initialFilter} option={saleFilter} setParam={setParam} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card padding="1rem">
            {permission.index && (
              <Show param={param} colums={saleColumn} permission={permission}>
                <SaleForm />
              </Show>
            )}
          </Card>
        </Col>
      </Row>
    </DataContext.Provider>
  );
};

export default SaleProcesses;
