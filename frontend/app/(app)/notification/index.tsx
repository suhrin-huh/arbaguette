import styled from '@emotion/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Button from '@/components/common/Button';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import NotificationItem from '@/components/common/Notification/NotificationItem';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

const NotiContainer = styled(ScrollView)(({ theme }) => ({
  flex: 1,
}));

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, title: '알림 1', content: '알림 1 내용', createdAt: new Date().toISOString() },
    { id: 2, title: '알림 2', content: '알림 2 내용', createdAt: new Date().toISOString() },
    { id: 3, title: '알림 3', content: '알림 3 내용', createdAt: new Date().toISOString() },
  ]);

  return (
    <ContainerView
      style={{
        paddingVertical: Layout.PADDING.VERTICAL,
        backgroundColor: Colors.WHITE,
        justifyContent: 'space-between',
      }}>
      <CenterHeaderbar left="before" title="알림" bgColor="white" right="none" onPressLeft={() => router.back()} />
      <NotiContainer contentContainerStyle={{ gap: 15, justifyContent: 'flex-start' }}>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notiData={notification} />
        ))}
      </NotiContainer>
      <Button
        onPress={() => {
          router.back();
        }}>
        <Text>닫기</Text>
      </Button>
    </ContainerView>
  );
};

export default NotificationScreen;
