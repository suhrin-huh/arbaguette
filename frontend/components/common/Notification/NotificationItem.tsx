import styled from '@emotion/native';
import { useQueryClient } from '@tanstack/react-query';
import type { Notification } from 'expo-notifications';
import { dismissNotificationAsync } from 'expo-notifications';
import { router } from 'expo-router';
import React from 'react';

import keys from '@/reactQuery/keys';

const NotiContainer = styled.Pressable(({ theme }) => ({
  gap: 4,
}));

const NotiHeader = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const NotiTitle = styled.Text(({ theme }) => ({
  color: theme.color.GRAY[3],
  fontSize: 16,
  fontWeight: '500',
}));

const NotiDate = styled.Text(({ theme }) => ({
  color: theme.color.GRAY[3],
  fontSize: 14,
  fontWeight: '400',
}));

const NotiContent = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: '400',
}));

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const queryClient = useQueryClient();
  const createdAt = new Date(notification.date);
  const formattedDate = createdAt.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const handleLink = async () => {
    await dismissNotificationAsync(notification.request.identifier);
    await queryClient.invalidateQueries({ queryKey: keys.notification() });
    const { url } = notification.request.content.data;
    if (!url) return;
    router.push(url);
  };

  return (
    <NotiContainer onPress={handleLink}>
      <NotiHeader>
        <NotiTitle>{notification.request.content.title}</NotiTitle>
        <NotiDate>{formattedDate}</NotiDate>
      </NotiHeader>
      <NotiContent>{notification.request.content.body}</NotiContent>
    </NotiContainer>
  );
};

export default NotificationItem;
