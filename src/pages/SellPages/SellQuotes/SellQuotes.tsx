import { Button } from '@app/components/common/buttons/Button/Button';
import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { H3 } from '@app/components/common/typography/H3/H3';
import ExportExcel from '@app/components/customs/exportexcel/ExportExcel';
import Filter from '@app/components/customs/filter/Filter';
import { columnQuotes } from '@app/components/customs/tables/columns';
import { API_URL } from '@app/configs/api-configs';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomColumns from '../components/CustomColumns';
import CustomersForm from '../components/CustomersForm';
import Show from './Show';

const SellQuotes: React.FC = () => {
  // const userListPermission = JSON.parse(getRoleUser());
  // const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const path = API_URL.QUOTES;
  const page = 'Báo giá';
  const [param, setParam] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'STT',
    'Thao tác',
    'Mã báo giá',
    'Ngày báo giá',
    'Tên doanh nghiệp',
    'Khách hàng',
    'Mã số thuế',
    'Email khách hàng',
    'Số điện thoại khách hàng',
    'Nhân viên phụ trách',
    'Số điện thoại nhân viên',
    'Ngày tạo',
    'Tổng cộng',
  ]);

  const navigate = useNavigate();
  const onCreate = () => {
    navigate('/quotes/create');
  };

  const option = [
    {
      value: 'tax_code',
      label: 'Mã số thuế',
      type: 'string',
    },
    {
      value: 'company_name',
      label: 'Tên doanh nghiệp',
      type: 'string',
    },
    {
      value: 'phone',
      label: 'Số điện thoại di động',
      type: 'string',
    },
    {
      value: 'headquarters_phone',
      label: 'Số điện thoại doanh nghiệp',
      type: 'string',
    },
    {
      value: 'headquarters_email',
      label: 'Email doanh nghiệp',
      type: 'string',
    },
    {
      value: 'email',
      label: 'Email cá nhân',
      type: 'string',
    },
    {
      value: 'customer_source.id',
      label: 'Nguồn gốc',
      type: 'string',
    },
    {
      value: 'company_field.id',
      label: 'Lĩnh vực',
      type: 'string',
    },
    {
      value: 'sale_process.id',
      label: 'Quy trình bán hàng',
      type: 'string',
    },
    {
      value: 'employee.shop_code',
      label: 'Theo đơn vị',
      type: 'string',
    },
    {
      value: 'headquarters_address',
      label: 'Địa chỉ',
      type: 'string',
    },
    {
      value: 'province.id',
      label: 'Tỉnh/TP',
      type: 'string',
    },
    {
      value: 'district.id',
      label: 'Quận/Huyện',
      type: 'string',
    },
    {
      value: 'area.id',
      label: 'Phường/Xã',
      type: 'string',
    },
    {
      value: 'created_at',
      label: 'Ngày tạo',
      type: 'datetime',
    },
  ];

  const initialValue = [
    { field: 'tax_code', operator: 'contain', value: '' },
    { field: 'company_name', operator: 'contain', value: '' },
  ];

  return (
    <>
      <PageTitle>Báo giá</PageTitle>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card padding="1rem">
            <Row justify={'space-between'}>
              <Col span={12}>
                <H3 className="typography-title">{page}</H3>
              </Col>
              <Col span={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '5px' }}>
                  <CustomColumns columns={visibleColumns} setColumns={setVisibleColumns} />
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
            <Show param={param} colums={columnQuotes} setListIdLead={''} visibleColumns={visibleColumns} path={path}>
              <CustomersForm isEditing={true} />
            </Show>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SellQuotes;
