import styled from '@emotion/native';
import React from 'react';
import { Text, View } from 'react-native';

const NotiContainer = styled(View)(({ theme }) => ({
  gap: 4,
}));

const NotiHeader = styled(View)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const NotiTitle = styled(Text)(({ theme }) => ({
  color: theme.color.GRAY[3],
  fontSize: 16,
  fontWeight: '500',
}));

const NotiDate = styled(Text)(({ theme }) => ({
  color: theme.color.GRAY[3],
  fontSize: 14,
  fontWeight: '400',
}));

const NotiContent = styled(Text)(({ theme }) => ({
  fontSize: 16,
  fontWeight: '400',
}));

const NotificationItem = ({ notiData }: { notiData: any }) => {
  const createdAt = new Date(notiData.createdAt);
  const formattedDate = createdAt.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return (
    <NotiContainer>
      <NotiHeader>
        <NotiTitle>{notiData.title}</NotiTitle>
        <NotiDate>{formattedDate}</NotiDate>
      </NotiHeader>
      <NotiContent>{notiData.content}</NotiContent>
    </NotiContainer>
  );
};

export default NotificationItem;
