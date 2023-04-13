import React, { useEffect } from 'react';
import { Input } from '../common/inputs/Input/Input';
import { Select } from '../common/selects/Select/Select';

interface IFilterText {
  onChange: any;
  defaultValue: string;
  onChangeValue: any;
}

const FilterText: React.FC<IFilterText> = ({ onChange, onChangeValue, defaultValue }) => {
  const option = [
    {
      value: 'contain',
      label: 'Nhập tìm kiếm',
    },
  ];

  const initValue = option.find((item) => {
    if (item.value === defaultValue) return item.label;
  });

  useEffect(() => {
    onChange('contain');
  }, []);

  return (
    <>
      <Select defaultValue={initValue} onChange={onChange} size="small" options={option} />
      <Input size="small" onChange={(e) => onChangeValue(e.target.value)} />
    </>
  );
};

export default FilterText;
