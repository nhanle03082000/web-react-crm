import { Button, Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import FilterDateTime from '@app/components/filter/FilterDateTime';
import FilterText from '@app/components/filter/FilterText';
import * as S from '@app/components/customs/Custom.styles';
import moment from 'moment';
import { Select } from '@app/components/common/selects/Select/Select';

interface IFilterProps {
  setData: any;
  onFilter: any;
  option: any;
}

const Filters: React.FC<IFilterProps> = ({ setData, onFilter, option }) => {
  const [listFilter, setListFilter] = useState<any>([{ field: '', operator: '', value: '' }]);
  const defaultNewFilter = { field: '', operator: '', value: '' };

  const handleClickAddRow = () => {
    setListFilter([...listFilter, defaultNewFilter]);
  };

  const deleteFilter = (index: any) => {
    const updatedListFilter = [...listFilter];
    updatedListFilter.splice(index, 1);
    setListFilter(updatedListFilter);
  };

  const onChangeSelectField = (index: number) => (data: any) => {
    console.log('@onChangeSelectFilter', { index, data });
    listFilter.splice(index, 1, {
      field: data,
      operator: listFilter[index].operator,
      value: listFilter[index].value,
    });
    setListFilter([...listFilter]);
  };

  const onChangeSelectOperator = (index: number) => (data: any) => {
    console.log('@onChangeSelectOperator', { index, data });
    listFilter.splice(index, 1, {
      field: listFilter[index].field,
      operator: data,
      value: listFilter[index].value,
    });
    setListFilter([...listFilter]);
  };

  const onChangeSelectValue = (index: number) => (data: any) => {
    let dataConvert = '';
    if (moment.isMoment(data)) {
      dataConvert = data.format('DD/MM/YYYY');
    } else {
      dataConvert = data;
    }
    console.log('@onChangeSelectValue', { index, data });
    listFilter.splice(index, 1, {
      field: listFilter[index].field,
      operator: listFilter[index].operator,
      value: dataConvert,
    });
    setListFilter([...listFilter]);
  };

  const f: any = {};
  listFilter.forEach((filter: any, i: any) => {
    f[`f[${i}][field]`] = filter.field;
    f[`f[${i}][operator]`] = filter.operator;
    f[`f[${i}][value]`] = filter.value;
  });
  const param = Object.entries(f)
    .map(([key, value]: any) => `${key}=${value}`)
    .join('&');

  useEffect(() => {
    setData(param);
  }, [param]);

  const renderFilter = (index: number, defaultValue: string) => {
    if (
      listFilter[index].field === 'code' ||
      listFilter[index].field === 'name' ||
      listFilter[index].field === 'description'
    ) {
      return (
        <FilterText
          defaultValue={'contain'}
          onChange={onChangeSelectOperator(index)}
          onChangeValue={onChangeSelectValue(index)}
        />
      );
    }
    if (listFilter[index].field === 'create_at' || listFilter[index].field === 'update_at') {
      return (
        <FilterDateTime
          index={index}
          listFilter={listFilter}
          defaultValue={defaultValue}
          onChange={onChangeSelectOperator(index)}
          onChangeValue={onChangeSelectValue(index)}
        />
      );
    }
  };

  return (
    <Row>
      <Col span={20}>
        {listFilter.map((item: any, index: number) => {
          return (
            <S.SelectWrapper key={index}>
              {/* <CustomSelect option={option} defaultInputValue={item.field} onChange={} /> */}
              <Select
                defaultValue={item.field || 'Lọc theo trường'}
                size="small"
                onChange={onChangeSelectField(index)}
                options={option}
              />
              {renderFilter(index, item.operator)}
              <Button size="small" onClick={() => deleteFilter(index)} className="button-delete">
                <S.Delete />
              </Button>
            </S.SelectWrapper>
          );
        })}
        <S.ButtonAdd className="button-add" size="small" onClick={handleClickAddRow}>
          +
        </S.ButtonAdd>
      </Col>
      <Col span={4} style={{ textAlign: 'end' }}>
        <S.ButtonFilter onClick={onFilter} size="small">
          Lọc
        </S.ButtonFilter>
      </Col>
    </Row>
  );
};

export default Filters;
