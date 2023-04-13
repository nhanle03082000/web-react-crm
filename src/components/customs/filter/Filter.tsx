import { RestOutlined } from '@ant-design/icons';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Input } from '@app/components/common/inputs/Input/Input';
import { Select } from '@app/components/common/selects/Select/Select';
import { Col, Form, Row } from 'antd';
import React, { useState } from 'react';
import FilterDateTime from './FilterDateTime';
import FilterText from './FilterText';

interface IProps {
  option: { value: string; label: string; type: string }[];
  setParam: any;
  initialValue: { field: string; operator: string; value: string }[];
}

const Filter: React.FC<IProps> = ({ option, setParam, initialValue }) => {
  const [listFilter, setListFilter] = useState<any>(initialValue);
  const defaultNewFilter = { field: '', operator: '', value: '' };
  const handleClickAddRow = () => {
    setListFilter([...listFilter, defaultNewFilter]);
  };

  const renderFilter = (name: number, index: number) => {
    switch (listFilter[index].field.type) {
      case 'datetime':
        return <FilterDateTime name={name} />;
      default:
        return <FilterText name={name} />;
    }
  };

  const onFinsh = (values: any) => {
    const f: any = {};
    values.filter.forEach((filter: any, i: any) => {
      f[`f[${i}][field]`] = filter.field;
      f[`f[${i}][operator]`] = filter.operator;
      f[`f[${i}][value]`] = filter.value;
    });
    const param = Object.entries(f)
      .map(([key, value]: any) => `${key}=${value}`)
      .join('&');
    console.log(f);
    // setParam(param);
  };

  const onChangeField = (index: number) => (value: any) => {
    const foundItem = option.find((item: any) => item.value === value);
    listFilter.splice(index, 1, {
      field: foundItem,
      operator: listFilter[index].operator,
      value: listFilter[index].value,
    });
    setListFilter([...listFilter]);
  };

  console.log(listFilter[0].field.type);

  return (
    <Form onFinish={onFinsh} layout="inline">
      <Form.List name="filter" initialValue={listFilter}>
        {(listFilter, { add, remove }) => (
          <Row style={{ width: '93%' }}>
            <Col span={24}>
              {listFilter.map(({ key, name }, index) => (
                <Row key={key}>
                  <Col span={4}>
                    <Form.Item
                      initialValue={option[0]}
                      name={[name, 'field']}
                      rules={[{ required: true, message: 'Missing first name' }]}
                    >
                      <Select options={option} placeholder="Lọc theo trường" onChange={onChangeField(index)} />
                    </Form.Item>
                  </Col>
                  <Col span={10}>{renderFilter(name, index)}</Col>
                  <Col span={2}>
                    <RestOutlined
                      onClick={() => remove(name)}
                      style={{ color: '#ff4d4f', fontSize: '24px', marginTop: '13px' }}
                    />
                  </Col>
                </Row>
              ))}
            </Col>
            <Col span={4}>
              <Form.Item>
                <Button type="primary" onClick={() => (add(), handleClickAddRow())}>
                  Thêm trường lọc
                </Button>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form.List>
      <Row style={{ width: '7%' }}>
        <Col span={24}>
          <Button type="primary" htmlType="submit" block>
            Lọc
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;