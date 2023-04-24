import { Col, Row, Space, Typography } from 'antd';
import { Notification as NotificationType } from 'api/notifications.api';
import { Notification } from 'components/common/Notification/Notification';
import { notificationsSeverities } from 'constants/notificationsSeverities';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './NotificationsOverlay.styles';

interface NotificationsOverlayProps {
  notifications: any[];
  setNotifications: (state: NotificationType[]) => void;
}

export const NotificationsOverlay: React.FC<NotificationsOverlayProps> = ({
  notifications,
  setNotifications,
  ...props
}) => {
  const { t } = useTranslation();

  const noticesList = useMemo(
    () =>
      notifications.map((notification, index) => {
        const type = notificationsSeverities.find((dbSeverity) => dbSeverity.id === notification.id)?.name;

        return (
          <Row key={index} justify="space-between">
            <Notification type={type || 'warning'} title={notification.title} description={notification.content} />
            <Typography.Link href={notification.link} target="_blank">
              Đi đến trang
            </Typography.Link>
          </Row>
        );
      }),
    [notifications, t],
  );

  return (
    <S.NoticesOverlayMenu {...props}>
      <S.MenuRow gutter={[20, 20]}>
        <Col span={24}>
          {notifications.length > 0 ? (
            <Space direction="vertical" size={10} split={<S.SplitDivider />}>
              {noticesList}
            </Space>
          ) : (
            <S.Text>Không có thông báo</S.Text>
          )}
        </Col>
        <Col span={24}>
          <Row gutter={[10, 10]}>
            {notifications.length > 0 && (
              <Col span={24}>
                <S.Btn type="ghost" onClick={() => setNotifications([])}>
                  Bỏ qua thông báo này
                </S.Btn>
              </Col>
            )}
          </Row>
        </Col>
      </S.MenuRow>
    </S.NoticesOverlayMenu>
  );
};
