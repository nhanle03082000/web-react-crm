import { Card } from '@app/components/common/Card/Card';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { H3 } from '@app/components/common/typography/H3/H3';
import ExportExcel from '@app/components/customs/exportexcel/ExportExcel';
import Filter from '@app/components/customs/filter/Filter';
import { columnOrder } from '@app/components/customs/tables/columns';
import { API_URL } from '@app/configs/api-configs';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import CustomColumns from '../components/CustomColumns';
import CustomersForm from '../components/CustomersForm';
import Show from './Show';

const SellOrders: React.FC = () => {
  // const userListPermission = JSON.parse(getRoleUser());
  // const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const path = API_URL.ORDERS;
  const page = 'Đơn hàng';
  const [param, setParam] = useState('');
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'STT',
    'Mã số thuế',
    'Nguồn gốc',
    'Thao tác',
    'Doanh nghiệp',
    'Họ tên',
    'SĐT di động',
    'Nhân viên phụ trách',
    'Quy trình bán hàng',
    'SĐT doanh nghiệp',
    'Email doanh nghiệp',
    'Email cá nhân',
    'Lĩnh vực hoạt động',
    'Địa chỉ trụ sở chính',
    'Tỉnh/Thành phố',
    'Quận/Huyện',
    'Phường/Xã',
  ]);

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
      value: 'employee.shop_code',
      label: 'Theo đơn vị',
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
  ];

  const initialValue = [
    { field: 'tax_code', operator: 'contain', value: '' },
    { field: 'company_name', operator: 'contain', value: '' },
  ];

  const onFilterChange = (id: number) => {
    const f: any = {};
    if (id === 0) {
      setParam('');
      return;
    }
    const listFilter = [{ field: '', operator: '', value: '' }];
    listFilter.forEach((filter: any, i: any) => {
      f[`f[${i}][field]`] = 'sale_process.id';
      f[`f[${i}][operator]`] = 'equal';
      f[`f[${i}][value]`] = id;
    });
    const param = Object.entries(f)
      .map(([key, value]: any) => `${key}=${value}`)
      .join('&');
    setParam(param);
  };

  return (
    <>
      <PageTitle>Đơn hàng</PageTitle>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Card padding="1rem">
            <Row justify={'space-between'}>
              <Col span={12}>
                <H3 className="typography-title">{page}</H3>
              </Col>
              <Col span={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '5px' }}>
                  {/* <CustomColumns columns={visibleColumns} setColumns={setVisibleColumns} /> */}
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
            <Show param={param} colums={columnOrder} setListIdLead={''} visibleColumns={visibleColumns} path={path}>
              <CustomersForm isEditing={true} />
            </Show>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SellOrders;
