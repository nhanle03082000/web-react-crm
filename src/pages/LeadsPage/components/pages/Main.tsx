import { UploadOutlined } from '@ant-design/icons';
import { Card } from '@app/components/common/Card/Card';
import { Popover } from '@app/components/common/Popover/Popover';
import { Upload } from '@app/components/common/Upload/Upload';
import { Button } from '@app/components/common/buttons/Button/Button';
import { H3 } from '@app/components/common/typography/H3/H3';
import Create from '@app/components/customs/crud/Create';
import ExportExcel from '@app/components/customs/exportexcel/ExportExcel';
import Filter from '@app/components/customs/filter/Filter';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { DataContext } from '@app/contexts/DataContext';
import { Col, Row, Space, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { columnLead } from '@app/components/customs/tables/columns';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { apiInstance } from '@app/api/app/api_core';
import CustomColumns from '../CustomColumns';
import AssignOverlay from '../AssignOverlay';
import LeadForm from '../LeadForm';
import Show from '../Show';

const Main: React.FC = () => {
  // const userListPermission = JSON.parse(getRoleUser());
  // const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const [saleProcesses, setSaleProcesses] = useState<any>([]);
  const { page } = useContext(DataContext);
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
  const download = '/files/lead.xlsx';
  const [listIdLead, setListIdLead] = useState([]);

  const option = [
    {
      value: 'tax_code',
      label: 'Mã số thuế',
      type: 'string',
    },
    {
      value: 'company_name',
      label: 'Tên DN',
      type: 'string',
    },
    {
      value: 'phone',
      label: 'Số điện thoại di động',
      type: 'string',
    },
    {
      value: 'headquarters_phone',
      label: 'Số điện thoại DN',
      type: 'string',
    },
    {
      value: 'headquarters_email',
      label: 'Email DN',
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
    const listFilter = [{ field: '', operator: '', value: '' }];
    const f: any = {};
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

  useEffect(() => {
    const getSaleProcessesList = async () => {
      try {
        const respSaleProcesses: IRespApiSuccess = await apiInstance.get(
          `${API_BASE_URL}${API_URL.SALEPROCESSES}?f[0][field]=type&f[0][operator]=contain&f[0][value]=leads&page=1&limit=10&sort_direction=asc&sort_column=sale_process_index`,
        );
        setSaleProcesses(respSaleProcesses.data.collection);
      } catch (error: any) {}
    };
    getSaleProcessesList();
  }, []);
  return (
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
                <Upload accept=".pdf,.doc,.docx,.xls,.xlsx" maxCount={1}>
                  <Button type="primary" icon={<UploadOutlined />}>
                    Nhập từ file
                  </Button>
                </Upload>
                <Button type="primary">
                  <Typography.Link href={download} target="_blank">
                    Tải file mẫu
                  </Typography.Link>
                </Button>
                <Popover placement="rightTop" trigger="click" content={<AssignOverlay listIdLead={listIdLead} />}>
                  <Button type="primary">Phân công</Button>
                </Popover>
                <Create>
                  <LeadForm isEditing={false} />
                </Create>
                <ExportExcel param={param} />
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={24}>
              <Filter initialValue={initialValue} option={option} setParam={setParam} />
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={24}>
              <Col>
                <Space>Bước bán hàng: &nbsp;</Space>
                <Space>
                  {saleProcesses.map((item: any, index: number) => {
                    return (
                      <Button
                        key={index}
                        style={{ backgroundColor: item.color, color: '#fff' }}
                        onClick={() => onFilterChange(item.id)}
                      >
                        {item.name}
                      </Button>
                    );
                  })}
                </Space>
              </Col>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card padding="1rem">
          <Show param={param} colums={columnLead} setListIdLead={setListIdLead} visibleColumns={visibleColumns}>
            <LeadForm isEditing={true} />
          </Show>
        </Card>
      </Col>
    </Row>
  );
};

export default Main;
