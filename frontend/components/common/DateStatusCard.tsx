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

const DateStatusCard = ({ dayScheduleData }: { dayScheduleData?: GetDayScheduleResponseData }) => {
  const { totalCount, normalCount, absentCount, yetCount } = dayScheduleData || {};

  const dateFomatter = () => {
    const date = new Date();
    const day = date.getDay();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getMonth() + 1}월 ${date.getDate()}일(${dayOfWeek[day]})`;
  };
  return (
    <CardContainer>
      <InnerContainer>
        <StatusTitle>{dateFomatter()}</StatusTitle>
        <StatusBox>
          <StatusText>총 {totalCount || 0}명</StatusText>
          <StatusText>출근 {normalCount || 0}명</StatusText>
          <StatusText>미출근 {yetCount || 0}명</StatusText>
        </StatusBox>
      </InnerContainer>
    </CardContainer>
  );
};

export default DateStatusCard;
