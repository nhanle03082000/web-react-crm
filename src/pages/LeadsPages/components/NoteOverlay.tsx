import { media } from '@app/styles/themes/constants';
import { Divider, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const Text = styled(Typography.Text)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  font-size: 0.875rem;
  cursor: pointer;

  & > a {
    display: block;
  }

  @media only screen and ${media.md} {
    font-size: 1rem;
  }
`;

const ItemsDivider = styled(Divider).withConfig({
  shouldForwardProp: (prop) => !['eventKey', 'warnKey'].includes(prop),
})`
  margin: 0;
`;

interface IProps {
  setIsEdit: any;
}

const NoteOverlay: React.FC<IProps> = ({ setIsEdit }) => {
  return (
    <div>
      <Text onClick={() => setIsEdit(true)}>Sửa ghi chú</Text>
      <ItemsDivider />
      <Text type="danger">Xoá ghi chú</Text>
    </div>
  );
};

export default NoteOverlay;
