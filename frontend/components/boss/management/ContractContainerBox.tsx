import styled from '@emotion/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react';

import DatePickerModal from '@/components/common/DatePickerModal';
import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

const ContractContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  gap: 20,
  paddingHorizontal: 10,
  width: '100%',
  height: 200,
}));

const InfoHeader = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  alignItems: 'flex-start',
}));

const InfoTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.color.BLACK,
}));

const InfoContent = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
}));

const DateTopBox = styled.View(({ theme }) => ({
  width: '100%',
  flexDirection: 'row',
  height: 60,
  borderWidth: 1,
  borderColor: theme.color.GRAY['2'],
  paddingRight: 20,
  paddingLeft: 30,
  borderTopEndRadius: 16,
  borderTopStartRadius: 16,
  borderBottomWidth: 1,
  borderTopWidth: 1.5,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const DateBottomBox = styled.View(({ theme }) => ({
  width: '100%',
  flexDirection: 'row',
  height: 60,
  borderWidth: 1,
  borderColor: theme.color.GRAY['2'],
  paddingRight: 20,
  paddingLeft: 30,
  borderTopWidth: 0,
  borderBottomWidth: 1.5,
  borderBottomEndRadius: 16,
  borderBottomStartRadius: 16,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const DateText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'semibold',
  color: theme.color.GRAY[4],
}));

const DatePickerButton = styled.TouchableOpacity(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
}));

const ContractContainerBox = () => {
  const { registStartDate, registEndDate, setRegistStartDate, setRegistEndDate, step1, setStep1 } = useRootStore();
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  useEffect(() => {
    if (registEndDate !== '근무 종료일' && step1 === 'date') {
      setStep1('time');
    }
  }, [registEndDate, step1, setStep1]);

  return (
    <ContractContainer>
      <InfoHeader>
        <InfoTitle>계약 기간</InfoTitle>
      </InfoHeader>
      <InfoContent>
        <DateTopBox>
          <DateText>{registStartDate}</DateText>
          <DatePickerButton onPress={() => setOpenStartDate(true)}>
            <MaterialCommunityIcons name="calendar-month" size={28} color={Colors.PRIMARY} />
          </DatePickerButton>
        </DateTopBox>
        <DateBottomBox>
          <DateText>{registEndDate}</DateText>
          <DatePickerButton onPress={() => setOpenEndDate(true)}>
            <MaterialCommunityIcons name="calendar-month" size={28} color={Colors.PRIMARY} />
          </DatePickerButton>
        </DateBottomBox>
      </InfoContent>
      <DatePickerModal open={openStartDate} setOpen={setOpenStartDate} setDate={setRegistStartDate} />
      <DatePickerModal open={openEndDate} setOpen={setOpenEndDate} setDate={setRegistEndDate} />
    </ContractContainer>
  );
};

export default ContractContainerBox;
