import styled from '@emotion/native';
import React, { useState } from 'react';

import Button from '@/components/common/Button';
import DatePickerModal from '@/components/common/DatePickerModal';
import useRootStore from '@/zustand';

const ContractContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  gap: 20,
  paddingHorizontal: 10,
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
  gap: 20,
  paddingHorizontal: 10,
}));

const DateBox = styled.View(({ theme }) => ({
  flexDirection: 'row',
  width: '100%',
  height: 50,
  borderWidth: 1,
  borderColor: theme.color.GRAY['2'],
  paddingHorizontal: 30,
  borderTopEndRadius: 16,
  borderTopStartRadius: 16,
  borderBottomWidth: 0,
  borderTopWidth: 1.5,
  borderLeftWidth: 1.5,
  borderRightWidth: 1.5,
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const DateText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.GRAY[3],
}));

const ContractContainerBox = () => {
  const { registStartDate, registEndDate, setRegistStartDate, setRegistEndDate } = useRootStore();
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);

  return (
    <ContractContainer>
      <InfoHeader>
        <InfoTitle>계약 기간</InfoTitle>
      </InfoHeader>
      <InfoContent>
        <DateBox>
          <DateText>{registStartDate}</DateText>
          <Button type="primary" onPress={() => setOpenStartDate(true)}>
            설정
          </Button>
        </DateBox>
        <DateBox>
          <DateText>{registEndDate}</DateText>
          <Button type="primary" onPress={() => setOpenEndDate(true)}>
            설정
          </Button>
        </DateBox>
      </InfoContent>
      <DatePickerModal open={openStartDate} setOpen={setOpenStartDate} setDate={setRegistStartDate} />
      <DatePickerModal open={openEndDate} setOpen={setOpenEndDate} setDate={setRegistEndDate} />
    </ContractContainer>
  );
};

export default ContractContainerBox;
