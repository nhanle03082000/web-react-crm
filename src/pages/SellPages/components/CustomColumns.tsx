import React from 'react';
import { Popover } from '@app/components/common/Popover/Popover';
import { Col, Row, Space, Switch } from 'antd';
import { Button } from '@app/components/common/buttons/Button/Button';

interface ICustomColumns {
  columns: any;
  setColumns: any;
}

const visibleColumns = [
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
  'Tổng cộng',
];

const CustomColumns: React.FC<ICustomColumns> = ({ columns, setColumns }) => {
  return (
    <Popover
      content={<CustomColumnsOverlay columns={columns} setColumns={setColumns} />}
      trigger="click"
      placement="rightTop"
    >
      <Button type="primary">Tuỳ chỉnh cột</Button>
    </Popover>
  );
};

const CustomColumnsOverlay = ({ columns, setColumns }: any) => {
  const handleColumnToggle = (checked: boolean, columnName: any) => {
    if (columns.includes(columnName) && checked === false) {
      const filterCol = columns.filter((item: any) => item !== columnName);
      setColumns(filterCol);
    } else {
      setColumns([...columns, columnName]);
    }

    // Lưu trạng thái cột vào localStorage
    localStorage.setItem('column_quotes', JSON.stringify(columns));
  };

  // Lấy trạng thái cột cuối cùng lưu trữ trong localStorage
  const storedColumns = JSON.parse(localStorage.getItem('column_quotes') || JSON.stringify(visibleColumns));

  return (
    <>
      {visibleColumns.map((item: any, index: number) => {
        const checked = storedColumns.includes(item);

        return (
          <Row key={index} style={{ margin: '2px 0' }} gutter={10}>
            <Col>
              <Switch defaultChecked={checked} onChange={(checked) => handleColumnToggle(checked, item)} />
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
