import Styled from '@emotion/native';
import React from 'react';
import { Text } from 'react-native';

import Screen from '@/components/common/Screen';
import { useEmploymentContract } from '@/reactQuery/querys';
import useRootStore from '@/zustand';

const Contract = Styled.View(({ theme }) => ({ gap: 10 }));

const Row = Styled.View(({ theme }) => ({
  backgroundColor: theme.color.GRAY['5'],
  width: '100%',
  height: 50,
  flexDirection: 'row',
}));

const Key = Styled.View(({ theme }) => ({
  backgroundColor: theme.color.GRAY['0'],
  flex: 1,
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100%',
}));

const Value = Styled.View(({ theme }) => ({
  backgroundColor: theme.color.GRAY['3'],
  flex: 1.6,
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100%',
}));

const KeyText = Styled.Text(({ theme }) => ({
  color: theme.color.BLACK,
  paddingLeft: 30,
  fontSize: 20,
  fontWeight: 600,
}));

const ValueText = Styled.Text(({ theme }) => ({
  color: theme.color.BLACK,
  fontSize: 20,
  fontWeight: 400,
}));

const SignatureScreen = () => {
  const { crewId } = useRootStore();
  const contract = useEmploymentContract(crewId || -1);

  console.log(contract);

  if (contract) return null;

  return (
    <Screen>
      <Text>대기화면</Text>
      <Contract>
        <Row>
          <Key>
            <KeyText>급여지급일</KeyText>
          </Key>
          <Value>
            <ValueText>daf</ValueText>
          </Value>
        </Row>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </Contract>
    </Screen>
  );
};

export default SignatureScreen;
