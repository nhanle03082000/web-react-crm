import { UploadOutlined } from '@ant-design/icons';
import { Card } from '@app/components/common/Card/Card';
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
import CustomersForm from './components/CustomersForm';
import Show from './components/Show';
import Assign from '@app/components/customs/assign/Assign';
import { filterLead } from '@app/configs/filter-configs';
import { useSelector } from 'react-redux';
import { selectCustomerColumns, updateCustomerColumnStatus } from '@app/store/slices/columnSlice';
import CustomColumns from '../../components/customs/tables/CustomColumns';
import { getRoleUser } from '@app/utils/redux.util';
import { useResponsive } from '@app/hooks/useResponsive';
import { Popover } from '@app/components/common/Popover/Popover';

const CustomersMain: React.FC = () => {
  const { page, path } = useContext(DataContext);
  const userListPermission = JSON.parse(getRoleUser());
  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  console.log('permission:', permission);
  const [saleProcesses, setSaleProcesses] = useState<any>([]);
  const [param, setParam] = useState('');
  const [activeButtonSale, setActiveButtonSale] = useState<number>(-1);
  const columns: any = useSelector(selectCustomerColumns);
  const download = '/files/file_mau_import.xlsx';
  const [listIdLead, setListIdLead] = useState([]);
  const { isDesktop } = useResponsive();

  const initialValue = [
    { field: 'tax_code', operator: 'contain', value: '' },
    { field: 'company_name', operator: 'contain', value: '' },
  ];

  const onFilterChange = (id: number, index: number) => {
    setActiveButtonSale(index);
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

  useEffect(() => {
    const getSaleProcessesList = async () => {
      try {
        const respSaleProcesses: IRespApiSuccess = await apiInstance.get(
          `${API_BASE_URL}${API_URL.SALEPROCESSES}?f[0][field]=type&f[0][operator]=contain&f[0][value]=customers&page=1&limit=10&sort_direction=asc&sort_column=sale_process_index`,
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
          <Row justify={'space-between'} align="middle">
            <Col span={12}>
              <H3 className="typography-title">{page}</H3>
            </Col>
            <Col span={12} xs={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
              {isDesktop ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '5px' }}>
                  <CustomColumns columns={columns} update={updateCustomerColumnStatus} />
                  {permission.create && (
                    <>
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
                    </>
                  )}
                  <Assign list={listIdLead} buttonName="Phân công" />
                  {permission.create && (
                    <Create>
                      <CustomersForm isEditing={false} />
                    </Create>
                  )}
                  {permission.export && <ExportExcel param={param} />}
                </div>
              ) : (
                <Popover
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                  content={
                    <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '5px' }}>
                      <CustomColumns columns={columns} update={updateCustomerColumnStatus} />
                      {permission.create && (
                        <>
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
                        </>
                      )}
                      <Assign list={listIdLead} buttonName="Phân công" />
                      {permission.create && (
                        <Create>
                          <CustomersForm isEditing={false} />
                        </Create>
                      )}
                      {permission.export && <ExportExcel param={param} />}
                    </div>
                  }
                  title="Hành động"
                >
                  <Button type="primary" style={{ width: 'fit-content' }}>
                    Hành động
                  </Button>
                </Popover>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={24}>
              <Filter initialValue={initialValue} option={filterLead} setParam={setParam} />
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={24}>
              <Col>
                <Space>Bước bán hàng: &nbsp;</Space>
                <Space>
                  <Button
                    onClick={() => onFilterChange(0, -1)}
                    className={`sale-button ${activeButtonSale === -1 ? 'sale-focus' : ''} `}
                    style={{ borderRadius: '20px', marginRight: '8px' }}
                  >
                    Tất cả
                  </Button>
                </Space>
                <Space>
                  {saleProcesses.map((item: any, index: number) => {
                    return (
                      <Button
                        className={`sale-button ${activeButtonSale === index ? 'sale-focus' : ''} ${
                          item.color === 'yellow' ? 'text-black' : ''
                        } `}
                        key={item.id}
                        style={{ backgroundColor: item.color, color: '#fff', borderRadius: '20px', border: 'none' }}
                        onClick={() => onFilterChange(item.id, index)}
                      >
                        <div className="sale-total">{item.total}</div>
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
          {permission.index && (
            <Show param={param} colums={columnLead} setListIdLead={setListIdLead}>
              <CustomersForm isEditing={true} />
            </Show>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CustomersMain;
