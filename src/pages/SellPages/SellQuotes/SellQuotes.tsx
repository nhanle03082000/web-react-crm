import { Button } from '@app/components/common/buttons/Button/Button';
import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { H3 } from '@app/components/common/typography/H3/H3';
import ExportExcel from '@app/components/customs/exportexcel/ExportExcel';
import Filter from '@app/components/customs/filter/Filter';
import { columnQuotes } from '@app/components/customs/tables/columns';
import { API_URL } from '@app/configs/api-configs';
import CustomColumns from '@app/components/customs/tables/CustomColumns';
import { selectQuotesColumns, updateQuotesColumnStatus } from '@app/store/slices/columnSlice';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomersForm from '../components/CustomersForm';
import Show from './Show';

const SellQuotes: React.FC = () => {
  // const userListPermission = JSON.parse(getRoleUser());
  // const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const path = API_URL.QUOTES;
  const page = 'Báo giá';
  const [param, setParam] = useState('');
  const columns: any = useSelector(selectQuotesColumns);
  const navigate = useNavigate();
  const onCreate = () => {
    navigate('/quotes/create');
  };

  const option = [
    {
      value: 'quotes.tax_code',
      label: 'Mã số thuế',
      type: 'string',
    },
    {
      value: 'quotes.company_name',
      label: 'Tên doanh nghiệp',
      type: 'string',
    },
    {
      value: 'phone',
      label: 'Số điện thoại di động',
      type: 'string',
    },
    {
      value: 'headquarters_email',
      label: 'Email doanh nghiệp',
      type: 'string',
    },
    {
      value: 'email',
      label: 'Email khách hàng',
      type: 'string',
    },
    {
      value: 'quotes.createdAt',
      label: 'Ngày tạo',
      type: 'datetime',
    },
  ];

  const initialValue = [
    { field: 'quotes.tax_code', operator: 'contain', value: '' },
    { field: 'quotes.company_name', operator: 'contain', value: '' },
  ];

  return (
    <>
      <PageTitle>Báo giá</PageTitle>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card padding="1rem">
            <Row justify="space-between" align="middle">
              <Col span={4}>
                <H3 className="typography-title">{page}</H3>
              </Col>
              <Col span={20}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '5px' }}>
                  <CustomColumns columns={columns} update={updateQuotesColumnStatus} />
                  <Button className="button-create" onClick={onCreate} type="primary">
                    Thêm {page}
                  </Button>
                  <ExportExcel param={param} />
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
            <Show param={param} colums={columnQuotes} path={path}>
              <CustomersForm isEditing={true} />
            </Show>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SellQuotes;
