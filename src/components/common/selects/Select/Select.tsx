import React, { ComponentProps } from 'react';
import { Select as AntSelect } from 'antd';
import { RefSelectProps } from 'antd/lib/select';
import * as S from './Select.styles';

export const { Option } = AntSelect;

export interface SelectProps extends ComponentProps<typeof AntSelect>, S.SelectProps {
  className?: string;
}

const filterOption = (inputValue: string, option: any) =>
  option.label.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;

export const Select = React.forwardRef<RefSelectProps, SelectProps>(({ className, width, children, ...props }, ref) => (
  <S.Select
    showSearch
    filterOption={filterOption}
    getPopupContainer={(triggerNode) => triggerNode}
    ref={ref}
    className={className}
    width={width}
    {...props}
  >
    {children}
  </S.Select>
));
