import styled from '@emotion/native';
import React from 'react';

import CardContainer from './CardContainer';

const InnerContainer = styled.View(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  gap: 15,
}));

const StatusTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
}));

const StatusBox = styled.View(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: theme.color.PRIMARY,
  width: '100%',
  height: 45,
  borderRadius: 10,
  alignItems: 'center',
  paddingHorizontal: 30,
}));

const StatusText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.WHITE,
}));

const DateStatusCard = () => {
  return (
    <CardContainer>
      <InnerContainer>
        <StatusTitle>9월 2일(수)</StatusTitle>
        <StatusBox>
          <StatusText>총 4명</StatusText>
          <StatusText>출근 2명</StatusText>
          <StatusText>미출근 2명</StatusText>
        </StatusBox>
      </InnerContainer>
    </CardContainer>
  );
};

export default DateStatusCard;
