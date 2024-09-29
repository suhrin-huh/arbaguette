import styled from '@emotion/native';
import { router } from 'expo-router';
import React, { useState } from 'react';

import Button from '@/components/common/Button';
import SalaryChartCard from '@/components/common/SalaryChartCard/SalaryChartCard';

import MonthBar from './MonthBar';

const SalaryContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.WHITE,
  borderRadius: 16,
}));

const SalaryTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'semibold',
  backgroundColor: theme.color.WHITE,
  color: theme.color.BLACK,
  textAlign: 'center',
  justifyContent: 'center',
  marginTop: 16,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}));

const MonthBarContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  height: 60,
}));

const SalaryTotalContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  flexDirection: 'row',
  paddingHorizontal: 60,
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const SalaryTotalText = styled.Text(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'semibold',
  backgroundColor: theme.color.WHITE,
  color: theme.color.BLACK,
}));

const AllSalaryContainer = styled.View(({ theme }) => ({
  marginTop: 16,
  backgroundColor: theme.color.WHITE,
  gap: 10,
  paddingBottom: 30,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
}));

const SalaryDuedateContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  flexDirection: 'row',
  paddingHorizontal: 60,
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const SalaryDuedateText = styled.Text(({ theme }) => ({
  fontSize: 14,
  fontWeight: 'semibold',
  color: theme.color.GRAY[3],
}));

interface SalaryReciptCardProps {
  receiptData: Receipt;
  crewId: CrewId;
}

const SalaryReciptCard = ({ receiptData, crewId }: SalaryReciptCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const sendHandler = () => {
    setModalVisible(true);
    router.push({
      pathname: './sendModal',
      params: {
        crewId,
      },
    });
  };

  return (
    <SalaryContainer>
      <SalaryTitle>급여명세서</SalaryTitle>
      <MonthBarContainer>
        <MonthBar year={2222} month={receiptData.month} />
      </MonthBarContainer>
      <SalaryChartCard title="none" />
      <AllSalaryContainer>
        <SalaryTotalContainer>
          <SalaryTotalText>총 근무시간</SalaryTotalText>
          <SalaryTotalText>{receiptData.totalTime}시간</SalaryTotalText>
        </SalaryTotalContainer>
        <SalaryTotalContainer>
          <SalaryTotalText>총 급여</SalaryTotalText>
          <SalaryTotalText>{receiptData.originSalary.toLocaleString()}원</SalaryTotalText>
        </SalaryTotalContainer>
        <SalaryDuedateContainer>
          <SalaryDuedateText>급여지급일</SalaryDuedateText>
          <SalaryDuedateText>2024.09.30이거 수정</SalaryDuedateText>
        </SalaryDuedateContainer>
        <Button size="hug" type="primary" buttonStyle={{ height: 40, marginTop: 10 }} onPress={sendHandler}>
          발송
        </Button>
      </AllSalaryContainer>
    </SalaryContainer>
  );
};

export default SalaryReciptCard;
