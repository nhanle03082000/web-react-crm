import { RestOutlined } from '@ant-design/icons';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Select } from '@app/components/common/selects/Select/Select';
import { Col, Form, Row } from 'antd';
import React, { Fragment, useContext, useState } from 'react';
import FilterDateTime from './FilterDateTime';
import FilterText from './FilterText';
import moment from 'moment';
import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { DataContext } from '@app/contexts/DataContext';

interface IProps {
  option: { value: string; label: string; type: string }[];
  setParam: any;
  initialValue: { field: string; operator: string; value: string }[];
}

const Filter: React.FC<IProps> = ({ option, setParam, initialValue }) => {
  const { setShow, show } = useContext(DataContext);
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
      f[`f[${i}][value]`] =
        typeof values.filter[i].value === 'string'
          ? values.filter[i].value
          : moment(new Date(filter.value).toUTCString()).format('YYYY/MM/DD');
    });
    const param = Object.entries(f)
      .map(([key, value]: any) => `${key}=${value}`)
      .join('&');
    setParam(param);
    setShow(!show);
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

  return (
    <Form onFinish={onFinsh} layout="inline" style={{ flexWrap: 'nowrap' }}>
      <Form.List name="filter" initialValue={listFilter}>
        {(listFilter, { add, remove }) => (
          <Row gutter={[10, 10]}>
            {listFilter.map(({ key, name }, index) => (
              <Col span={24} key={key}>
                <Row>
                  <Col span={6}>
                    <Form.Item initialValue={option[0]} name={[name, 'field']}>
                      <Select options={option} placeholder="Lọc theo trường" onChange={onChangeField(index)} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>{renderFilter(name, index)}</Col>
                  <Col span={6}>
                    <DeleteIcon onClick={() => remove(name)} />
                  </Col>
                </Row>
              </Col>
            ))}
            <Col span={24}>
              <Form.Item>
                <Button type="primary" onClick={() => (add(), handleClickAddRow())}>
                  Thêm trường lọc
                </Button>
              </Form.Item>
            </Col>
          </Row>
        )}
      </Form.List>
      <Row>
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
