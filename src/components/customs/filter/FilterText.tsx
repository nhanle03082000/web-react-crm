import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { Col, Form, Row } from 'antd';
import React from 'react';

interface IFilterText {
  name: number;
}

const FilterText: React.FC<IFilterText> = ({ name }) => {
  const option = [
    {
      value: 'contain',
      label: 'Nhập tìm kiếm',
    },
  ];

  return (
    <Row gutter={[10, 10]}>
      <Col span={12}>
        <Form.Item name={[name, 'operator']}>
          <Select options={option} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={[name, 'value']}>
          <Input size="small" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FilterText;
