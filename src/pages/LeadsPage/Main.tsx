import { UploadOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Card } from '@app/components/common/Card/Card';
import { Popover } from '@app/components/common/Popover/Popover';
import { H3 } from '@app/components/common/typography/H3/H3';
import { Upload } from '@app/components/common/Upload/Upload';
import Assign from '@app/components/customs/assign/Assign';
import Create from '@app/components/customs/crud/Create';
import ExportExcel from '@app/components/customs/exportexcel/ExportExcel';
import Filter from '@app/components/customs/filter/Filter';
import { columnLead } from '@app/components/customs/tables/columns';
import { API_BASE_URL, API_URL } from '@app/configs/api-configs';
import { filterLead } from '@app/configs/filter-configs';
import { DataContext } from '@app/contexts/DataContext';
import { useResponsive } from '@app/hooks/useResponsive';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { selectLeadColumns, updateLeadColumnStatus } from '@app/store/slices/columnSlice';
import { getRoleUser } from '@app/utils/redux.util';
import { Col, Row, Space, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomColumns from '../../components/customs/tables/CustomColumns';
import LeadForm from './components/LeadForm';
import Show from './components/Show';

const Main: React.FC = () => {
  const { page, path } = useContext(DataContext);
  const userListPermission = JSON.parse(getRoleUser());
  const permission = userListPermission?.filter((item: any) => item.name === path.replace(/\//g, ''))[0].actions;
  const [saleProcesses, setSaleProcesses] = useState<any>([]);
  const [param, setParam] = useState('');
  const [activeButtonSale, setActiveButtonSale] = useState<number>(-1);
  const download = '/files/file_mau_import.xlsx';
  const [listIdLead, setListIdLead] = useState([]);
  const columns: any = useSelector(selectLeadColumns);
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
          <Row justify={'space-between'} align="middle">
            <Col span={12}>
              <H3 className="typography-title">{page}</H3>
            </Col>
            <Col span={12} xs={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
              {isDesktop ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end', columnGap: '5px' }}>
                  <CustomColumns columns={columns} update={updateLeadColumnStatus} />
                  {permission.import && (
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
                  {permission.assign && <Assign list={listIdLead} buttonName="Phân công" />}
                  {permission.create && (
                    <Create>
                      <LeadForm isEditing={false} />
                    </Create>
                  )}
                  {permission.export && <ExportExcel param={param} />}
                </div>
              ) : (
                <Popover
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                  content={
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '5px' }}>
                      <CustomColumns columns={columns} update={updateLeadColumnStatus} />
                      {permission.import && (
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
                      {permission.assign && <Assign list={listIdLead} buttonName="Phân công" />}
                      {permission.create && (
                        <Create>
                          <LeadForm isEditing={false} />
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
              <Row>
                <Space>Bước bán hàng:</Space>
                <Space>
                  <Button
                    onClick={() => onFilterChange(0, -1)}
                    className={`sale-button ${activeButtonSale === -1 ? 'sale-focus' : ''} `}
                    style={{ borderRadius: '20px', margin: '4px 8px' }}
                  >
                    Tất cả
                  </Button>
                </Space>
                <Space style={{ flexWrap: 'wrap' }}>
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
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card padding="1rem">
          {permission.index && (
            <Show param={param} colums={columnLead} setListIdLead={setListIdLead} permission={permission}>
              <LeadForm isEditing={true} />
            </Show>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default Main;
