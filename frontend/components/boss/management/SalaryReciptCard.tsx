import styled from '@emotion/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text } from 'react-native';

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
  crewData: GetCrewMemberDetailResponseData;
}

const SalaryReciptCard = ({ crewData }: SalaryReciptCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const nowMonth = new Date().getMonth() + 1;
  const [monthVar, setMonthVar] = useState(nowMonth);
  const { receipts, id, salary, tax, allowance, workHours } = crewData;
  const receiptData: Receipt[] = [...receipts, { month: nowMonth, tax, allowance, salary, totalTime: workHours }];

  const receiptObj: { [key: number]: Receipt | {} } = {};
  for (let i = nowMonth; i > 0; i--) {
    receiptData.forEach((receipt) => {
      if (receipt.month === i) {
        receiptObj[i] = receipt;
      } else {
        receiptObj[i] = {};
      }
    });
  }

  console.log(receiptObj);

  const sendHandler = () => {
    console.log(receiptObj[monthVar]);
    if (Object.keys(receiptObj[monthVar]).length === 0) {
      Alert.alert('해당 월의 급여가 없습니다.');
      return;
    }

    setModalVisible(true);
    router.push({
      pathname: './sendModal',
      params: {
        crewId: id,
        month: monthVar,
        originSalary: receiptObj[monthVar] && 'salary' in receiptObj[monthVar] ? receiptObj[monthVar].salary : 0,
        tax: receiptObj[monthVar] && 'tax' in receiptObj[monthVar] ? receiptObj[monthVar].tax : 0,
        allowance: receiptObj[monthVar] && 'allowance' in receiptObj[monthVar] ? receiptObj[monthVar].allowance : 0,
        totalTime: receiptObj[monthVar] && 'totalTime' in receiptObj[monthVar] ? receiptObj[monthVar].totalTime : 0,
      },
    });
  };

  const onPressLeft = () => {
    if (monthVar === 1) return;
    setMonthVar(monthVar - 1);
  };

  const onPressRight = () => {
    if (monthVar === nowMonth) {
      Alert.alert('최신 급여명세서만 조회할 수 있습니다.');
      return;
    }
    setMonthVar(monthVar + 1);
  };

  return (
    <SalaryContainer>
      <SalaryTitle>급여명세서</SalaryTitle>
      <MonthBarContainer>
        <MonthBar year={2024} month={monthVar} onPressLeft={onPressLeft} onPressRight={onPressRight} />
      </MonthBarContainer>
      <AllSalaryContainer>
        <SalaryChartCard
          originSalary={receiptObj[monthVar] && 'salary' in receiptObj[monthVar] ? receiptObj[monthVar].salary : 0}
          tax={receiptObj[monthVar] && 'tax' in receiptObj[monthVar] ? receiptObj[monthVar].tax : 0}
          allowance={receiptObj[monthVar] && 'allowance' in receiptObj[monthVar] ? receiptObj[monthVar].allowance : 0}
        />

        <SalaryTotalContainer>
          <SalaryTotalText>총 근무시간</SalaryTotalText>
          <SalaryTotalText>
            {receiptObj[monthVar] && 'totalTime' in receiptObj[monthVar] ? receiptObj[monthVar].totalTime : 0}시간
          </SalaryTotalText>
        </SalaryTotalContainer>
        <SalaryTotalContainer>
          <SalaryTotalText>총 급여</SalaryTotalText>
          <SalaryTotalText>
            {receiptObj[monthVar] && 'salary' in receiptObj[monthVar]
              ? receiptObj[monthVar].salary.toLocaleString()
              : 0}
            원
          </SalaryTotalText>
        </SalaryTotalContainer>
        <SalaryDuedateContainer>
          <SalaryDuedateText>급여지급일</SalaryDuedateText>
          <SalaryDuedateText>매달 15일</SalaryDuedateText>
        </SalaryDuedateContainer>
        <Button size="hug" type="primary" buttonStyle={{ height: 40, marginTop: 10 }} onPress={sendHandler}>
          발송
        </Button>
      </AllSalaryContainer>
    </SalaryContainer>
  );
};

export default SalaryReciptCard;
