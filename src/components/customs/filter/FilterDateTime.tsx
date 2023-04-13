import { Select } from '@app/components/common/selects/Select/Select';
import { Col, DatePicker, Form, Row } from 'antd';
import React from 'react';

interface IFilterDateTime {
  name: number;
}

const FilterDateTime: React.FC<IFilterDateTime> = ({ name }) => {
  const option = [
    {
      value: 'equal_to',
      label: 'Chọn ngày',
    },
    {
      value: 'less_than',
      label: 'Nhỏ hơn ngày',
    },
    {
      value: 'greater_than',
      label: 'Lớn hơn ngày',
    },
    {
      value: 'less_than_or_equal_to',
      label: 'Nhỏ hơn hoặc bằng ngày',
    },
    {
      value: 'greater_than_or_equal_to',
      label: 'Lớn hơn hoặc bằng ngày',
    },
  ];

  return (
    <Row gutter={[10, 10]}>
      <Col span={12}>
        <Form.Item name={[name, 'operator']}>
          <Select size="small" options={option} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={[name, 'value']}>
          <DatePicker format="L" size="small" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FilterDateTime;
