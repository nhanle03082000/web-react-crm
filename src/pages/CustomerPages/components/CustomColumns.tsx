import React from 'react';
import { Popover } from '@app/components/common/Popover/Popover';
import * as S from '../Customer.styles';
import { Col, Row, Space, Switch } from 'antd';

interface ICustomColumns {
  columns: any;
  setColumns: any;
}

const visibleColumns = [
  'STT',
  'Mã số thuế',
  'Nguồn gốc',
  'Thao tác',
  'Doanh nghiệp',
  'Họ tên',
  'SĐT di động',
  'SĐT doanh nghiệp',
  'Email doanh nghiệp',
  'Email cá nhân',
  'Lĩnh vực hoạt động',
  'Địa chỉ trụ sở chính',
];

const CustomColumns: React.FC<ICustomColumns> = ({ columns, setColumns }) => {
  return (
    <Popover
      content={<CustomColumnsOverlay columns={columns} setColumns={setColumns} />}
      trigger="click"
      placement="rightTop"
    >
      <S.ButtonCustomColumns>Tuỳ chỉnh cột</S.ButtonCustomColumns>
    </Popover>
  );
};

const CustomColumnsOverlay = ({ columns, setColumns }: any) => {
  const handleColumnToggle = (checked: boolean, columnName: any) => {
    if (columns.includes(columnName) && checked === false) {
      setColumns(columns.filter((item: any) => item !== columnName));
    } else {
      setColumns([...columns, columnName]);
    }
  };
  return (
    <>
      {visibleColumns.map((item: any, index: number) => {
        return (
          <Row key={index} style={{ margin: '2px 0' }} gutter={10}>
            <Col>
              <Switch defaultChecked onChange={(checked) => handleColumnToggle(checked, item)} />
            </Col>
            <Col>
              <Space>{item}</Space>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default CustomColumns;
