import React from 'react';
import { Col, Row } from 'antd';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import * as S from '../Header.styles';
import { HeaderFullscreen } from '../components/HeaderFullscreen/HeaderFullscreen';

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {
  return (
    <Row justify="space-between" align="middle">
      <Col lg={10} xxl={8}></Col>
      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <Row align="middle" justify="end" gutter={[10, 10]}>
          <Col>
            <Row gutter={[{ xxl: 10 }, { xxl: 10 }]} align="middle">
              <Col>
                <HeaderFullscreen />
              </Col>
              <Col>
                <NotificationsDropdown />
              </Col>
              <Col>
                <SettingsDropdown />
              </Col>
              <Col>
                <ProfileDropdown />
              </Col>
            </Row>
          </Col>
        </Row>
      </S.ProfileColumn>
    </Row>
  );
};
