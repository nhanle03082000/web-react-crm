import DeleteIcon from '@app/assets/icon-components/DeleteIcon';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Select } from '@app/components/common/selects/Select/Select';
import { DataContext } from '@app/contexts/DataContext';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Col, Form, Row } from 'antd';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import FilterDateTime from './FilterDateTime';
import FilterText from './FilterText';

interface IProps {
  option: { value: string; label: string; type: string }[];
  setParam: any;
  initialValue: any[];
}

const Filter: React.FC<IProps> = ({ option, setParam, initialValue }) => {
  const { setShow, show } = useContext(DataContext);
  const [listFilter, setListFilter] = useState<any>(initialValue);
  const defaultNewFilter = { field: '', operator: '', value: '' };
  const handleClickAddRow = () => {
    setListFilter([...listFilter, defaultNewFilter]);
  };
  const dataFromTable = useAppSelector((state) => state.app.dataTable);
  const [optionIncludesOperator, setOptionIncludesOperator] = useState<{ value: string; label: string }[]>([
    { value: '', label: '' },
  ]);

  const renderFilter = (name: number, index: number) => {
    switch (listFilter[index].field.type) {
      case 'datetime':
        return <FilterDateTime name={name} />;
      default:
        return (
          <FilterText
            name={name}
            dataFromTable={dataFromTable}
            dataField={listFilter[index].field}
            optionIncludesOperator={optionIncludesOperator}
            setOptionIncludesOperator={setOptionIncludesOperator}
          />
        );
    }
  };

  const onFinsh = (values: any) => {
    const f: any = {};
    values.filter.forEach((filter: any, i: any) => {
      f[`f[${i}][field]`] = filter.field;
      f[`f[${i}][operator]`] = filter.operator;
      if (moment.isMoment(values.filter[i].value)) {
        f[`f[${i}][value]`] = moment(new Date(filter.value).toUTCString()).format('YYYY/MM/DD');
      } else {
        f[`f[${i}][value]`] = values.filter[i].value;
      }
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
      field: foundItem?.value,
      operator: listFilter[index].operator,
      value: listFilter[index].value,
    });
    setListFilter([...listFilter]);
    // const optionIncludes = dataFromTable.map((item) => {
    //   return { value: item[listFilter[index].field], label: item[listFilter[index].field] };
    // });
    if (listFilter[index].field.includes('.')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [part1, part2] = listFilter[index].field.split('.');
      const optionIncludes = dataFromTable.map((item: any) => {
        return { value: item[part1]?.name, label: item[part1]?.name };
      });
      const uniqueArr: any = optionIncludes.reduce((acc: any, current: any) => {
        const x = acc.find((item: any) => item.value === current.value);
        if (!x) {
          return acc.concat([current]);
        } else {
          console.log(acc);
        }
      }, []);
      setOptionIncludesOperator(uniqueArr);
    } else {
      const optionIncludes = dataFromTable.map((item: any) => {
        return { value: item[listFilter[index].field], label: item[listFilter[index].field] };
      });
      setOptionIncludesOperator(optionIncludes);
    }
  };

  return (
    <Form onFinish={onFinsh} layout={'horizontal'} style={{ flexWrap: 'nowrap' }}>
      <Form.List name="filter" initialValue={listFilter}>
        {(listFilter, { add, remove }) => (
          <Row gutter={10}>
            {listFilter.map(({ key, name }, index) => (
              <Col span={24} key={key}>
                <Row gutter={[10, 10]}>
                  <Col span={8}>
                    <Form.Item initialValue={option[0]} name={[name, 'field']}>
                      <Select options={option} placeholder="Lọc theo trường" onChange={onChangeField(index)} />
                    </Form.Item>
                  </Col>
                  <Col span={14}>{renderFilter(name, index)}</Col>
                  <Col span={2}>
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
          <Button type="primary" htmlType="submit">
            Lọc
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Filter;
