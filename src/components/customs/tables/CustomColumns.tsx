import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Popover } from '@app/components/common/Popover/Popover';
import { Col, Row, Space, Switch, Tooltip } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';

interface ICustomColumns {
  columns: any;
  update: ({ index, checked }: any) => void;
}

const CustomColumns: React.FC<ICustomColumns> = ({ columns, update }) => {
  return (
    <Popover content={<CustomColumnsOverlay columns={columns} update={update} />} trigger="click" placement="rightTop">
      <Button type="primary">Tuỳ chỉnh cột</Button>
    </Popover>
  );
};

const CustomColumnsOverlay = ({ columns, update }: any) => {
  const dispatch = useDispatch();
  const handleColumnToggle = (checked: boolean, index: any) => {
    dispatch(update({ index, checked }));
  };

  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <Tooltip placement="topLeft" title="Thiết lập này chỉ áp dụng trên trình duyệt của thiết bị" zIndex={2001}>
          <ExclamationCircleOutlined style={{ color: 'var(--ant-primary-color)' }} />
        </Tooltip>
      </div>
      {columns.map((item: any, index: number) => {
        return (
          <Row key={index} style={{ margin: '2px 0' }} gutter={10}>
            <Col>
              <Switch defaultChecked={item.status} onChange={(checked) => handleColumnToggle(checked, index)} />
            </Col>
            <Col>
              <Space>{item.name}</Space>
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default CustomColumns;
