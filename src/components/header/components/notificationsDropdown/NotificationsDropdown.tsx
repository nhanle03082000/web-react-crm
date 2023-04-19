import React, { useEffect, useState } from 'react';
import { BellOutlined } from '@ant-design/icons';
import { Button } from '@app/components/common/buttons/Button/Button';
import { Badge } from '@app/components/common/Badge/Badge';
import { NotificationsOverlay } from '@app/components/header/components/notificationsDropdown/NotificationsOverlay/NotificationsOverlay';
import { notifications as fetchedNotifications, Notification } from '@app/api/notifications.api';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { Popover } from '@app/components/common/Popover/Popover';
import { IRespApiSuccess } from '@app/interfaces/interfaces';
import { apiInstance } from '@app/api/app/api_core';
import { API_BASE_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';

export const NotificationsDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(fetchedNotifications);
  const [isOpened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const path = '/notifications';

  useEffect(() => {
    const getListNotification = async () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    getListNotification();
  }, []);

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
        />
      </HeaderActionWrapper>
    </Popover>
  );
};
