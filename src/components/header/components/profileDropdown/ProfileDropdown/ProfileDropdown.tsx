import React from 'react';
import { Avatar, Col, Row } from 'antd';
import { H6 } from '@app/components/common/typography/H6/H6';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import * as S from './ProfileDropdown.styles';
import { Popover } from '@app/components/common/Popover/Popover';
import man from '@app/assets/images/man.png';

export const ProfileDropdown: React.FC = () => {
  const { isBigScreen } = useResponsive();

  const user = useAppSelector((state) => state.user.user);

  return (
    <Popover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={Row} gutter={[10, 10]} align="middle">
        <Col>
          <Avatar src={man} alt="User" shape="circle" size={40} />
        </Col>
        {isBigScreen && (
          <Col>
            <H6>{`${user?.name}`}</H6>
          </Col>
        )}
      </S.ProfileDropdownHeader>
    </Popover>
  );
};
