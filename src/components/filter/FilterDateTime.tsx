import { DatePicker } from 'antd';
import React from 'react';
import { Select } from '../common/selects/Select/Select';

interface IFilterDateTime {
  onChange: any;
  index: number;
  defaultValue: string;
  listFilter: any;
  onChangeValue: any;
}

const FilterDateTime: React.FC<IFilterDateTime> = ({ onChange, onChangeValue, defaultValue }) => {
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

  const initValue = option.find((item) => {
    if (item.value === defaultValue) return item.label;
  });

  return (
    <>
      <Select
        defaultValue={initValue || 'Lọc theo'}
        onChange={onChange}
        size="small"
        options={option}
        className="ant-select-operator"
      />
      <DatePicker format="L" size="small" onChange={onChangeValue} />
    </>
  );
};

export default FilterDateTime;
