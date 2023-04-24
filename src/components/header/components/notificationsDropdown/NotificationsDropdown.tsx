import { BellOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/app/api_core';
import { Notification } from '@app/api/notifications.api';
import { Badge } from '@app/components/common/Badge/Badge';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Popover } from '@app/components/common/Popover/Popover';
import { NotificationsOverlay } from '@app/components/header/components/notificationsDropdown/NotificationsOverlay/NotificationsOverlay';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import React, { useState } from 'react';

export const NotificationsDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpened, setOpened] = useState(false);
  const path = '/notifications';

  const getListNotification = async () => {
    try {
      const respNoti: IRespApiSuccess = await apiInstance.get(`${API_BASE_URL}${path}`);
      if (respNoti.code === 200) {
        setNotifications(respNoti.data.collection);
      }
    } catch (error: any) {
      notificationController.error({
        message: 'Có lỗi xảy ra vui lòng thử lại sau',
        description: error.message,
      });
    }
  };

  return (
    <Popover
      trigger="click"
      content={<NotificationsOverlay notifications={notifications} setNotifications={setNotifications} />}
      onOpenChange={setOpened}
    >
      <HeaderActionWrapper>
        <Button
          type={isOpened ? 'ghost' : 'text'}
          icon={
            <Badge dot>
              <BellOutlined />
            </Badge>
          }
          onClick={getListNotification}
        />
      </HeaderActionWrapper>
    </Popover>
  );
};
