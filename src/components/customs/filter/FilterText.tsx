import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { Col, Form, Row } from 'antd';
import React, { useState } from 'react';

interface IFilterText {
  name: number;
  optionIncludesOperator: any;
  setOptionIncludesOperator: any;
  dataField: string;
  dataFromTable: any;
}

const FilterText: React.FC<IFilterText> = ({
  name,
  optionIncludesOperator,
  setOptionIncludesOperator,
  dataField,
  dataFromTable,
}) => {
  const [operatorValue, setOperatorValue] = useState('contain');
  const option = [
    {
      value: 'contain',
      label: 'Nhập tìm kiếm',
    },
    {
      value: 'includes',
      label: 'Chọn tìm kiếm',
    },
  ];

  const onChangeOperator = (value: any) => {
    setOperatorValue(value);
    if (value === 'includes') {
      if (dataField.includes('.')) {
        const [part1, part2] = dataField.split('.');
        const optionIncludes = dataFromTable.map((item: any) => {
          return { value: item[part1]?.name, label: item[part1]?.name };
        });
        const uniqueArr = optionIncludes.reduce((acc: any[], current: any) => {
          const x = acc.find((item: any) => item.value === current.value);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setOptionIncludesOperator(uniqueArr);
      } else {
        const optionIncludes = dataFromTable.map((item: any) => {
          return { value: item[dataField], label: item[dataField] };
        });
        setOptionIncludesOperator(optionIncludes);
      }
    }
  };

  return (
    <Row gutter={[10, 10]}>
      <Col span={12}>
        <Form.Item name={[name, 'operator']}>
          <Select options={option} onChange={onChangeOperator} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name={[name, 'value']}>
          {operatorValue === 'contain' ? (
            <Input size="small" />
          ) : (
            <Select size="small" mode="multiple" options={optionIncludesOperator} placeholder="Gõ hoặc nhấn để chọn" />
          )}
        </Form.Item>
      </Col>
    </Row>
  );
};

export default FilterText;
