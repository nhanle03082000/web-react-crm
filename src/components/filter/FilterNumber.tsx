import { Select, Space } from 'antd';
import React, { useState } from 'react';
import { InputNumber } from '../common/inputs/InputNumber/InputNumber.styles';

const FilterNumber: React.FC = () => {
  const [typeSearch, setTypeSearch] = useState<string>('between');
  const onChangeTypeSearch = (value: any) => {
    setTypeSearch(value);
  };

  let component: React.ReactNode;

  if (typeSearch === 'between' || typeSearch === 'not_between') {
    component = (
      <Space>
        <InputNumber size="small" min={1} max={100000} defaultValue={3} />
        <InputNumber size="small" min={1} max={100000} defaultValue={3} />
      </Space>
    );
  } else {
    component = <InputNumber size="small" min={1} max={10} defaultValue={3} />;
  }

  return (
    <>
      <Select
        defaultValue="Ở giữa"
        onChange={onChangeTypeSearch}
        size="small"
        options={[
          {
            value: 'equal_to',
            label: 'Giá trị bằng',
          },
          {
            value: 'not_equal_to',
            label: 'Không phải giá trị',
          },
          {
            value: 'less_than',
            label: 'Thấp hơn',
          },
          {
            value: 'greater_than',
            label: 'Cao hơn',
          },
          {
            value: 'less_than_or_equal_to',
            label: 'Thấp hơn hoặc bằng',
          },
          {
            value: 'greater_than_or_equal_to',
            label: 'Cao hơn hoặc bằng',
          },
          {
            value: 'between',
            label: 'Ở giữa',
          },
          {
            value: 'not_between',
            label: 'Không nằm giữa',
          },
        ]}
      />
      {component}
    </>
  );
};

export default FilterNumber;
