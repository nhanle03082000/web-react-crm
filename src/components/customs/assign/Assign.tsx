import React from 'react';
import AssignOverlay from './AssignOverlay';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Popover } from '@app/components/common/Popover/Popover';

interface IProps {
  list: any;
  buttonName: string;
}

const Assign: React.FC<IProps> = ({ list, buttonName }) => {
  return (
    <Popover placement="bottomRight" trigger="click" content={<AssignOverlay list={list} />}>
      <Button type="primary">{buttonName}</Button>
    </Popover>
  );
};

export default Assign;
