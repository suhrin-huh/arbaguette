import styled from '@emotion/native';
import { useQueryClient } from '@tanstack/react-query';
import { dismissAllNotificationsAsync } from 'expo-notifications';
import React from 'react';
import { View } from 'react-native';

import Button from '@/components/common/Button';
import NotificationItem from '@/components/common/Notification/NotificationItem';
import Screen from '@/components/common/Screen';
import usePresentedNotification from '@/hooks/usePresentedNotification';
import keys from '@/reactQuery/keys';
import Theme from '@/styles/Theme';

const NotificationScreen = () => {
  const queryClient = useQueryClient();
  const notifications = usePresentedNotification();

  const handleDismissAllNotifications = async () => {
    await dismissAllNotificationsAsync();
    await queryClient.invalidateQueries({ queryKey: keys.notification() });
  };

  return (
    <Screen type="view" viewOption={{ style: { backgroundColor: Theme.color.WHITE, paddingTop: 0 } }}>
      <View style={{ flex: 1 }}>
        <Screen
          type="scroll"
          viewOption={{
            style: { backgroundColor: Theme.color.WHITE },
            contentContainerStyle: { paddingHorizontal: 0, paddingVertical: 0, gap: 10 },
          }}>
          {!!notifications.length &&
            notifications
              .slice()
              .sort((noti1, noti2) => noti2.date - noti1.date)
              .map((notification) => (
                <NotificationItem key={notification.request.identifier} notification={notification} />
              ))}
        </Screen>
      </View>
      <Button onPress={handleDismissAllNotifications}>초기화</Button>
    </Screen>
  );
};

export default NotificationScreen;
