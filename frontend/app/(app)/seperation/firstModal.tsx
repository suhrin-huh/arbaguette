import styled from '@emotion/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { format } from 'util';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import BottomSheetModal from '@/components/common/modal/BottomSheetModal';
import useRootStore from '@/zustand';

const Container = styled.View(({ theme }) => ({
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingBottom: theme.layout.PADDING.VERTICAL,
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
}));

const Content = styled.View(({ theme }) => ({
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  gap: 10,
  width: '100%',
}));

const ContentText = styled.Text(({ theme }) => ({
  color: theme.color.PRIMARY,
  fontSize: 20,
  fontWeight: 600,
}));

const InputContainer = styled.View(({ theme }) => ({
  marginBottom: 20,
  width: '60%',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
  paddingBottom: 20,
}));

const FirstModal = () => {
  const [money, setMoney] = useState('');
  const { setSpreadBread } = useRootStore();

  const formatMoney = (value: string) => {
    // 숫자가 아닌 문자 제거
    const numericValue = value.replace(/[^0-9]/g, '');
    // 천 단위 구분자 추가
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const applyHandler = () => {
    if (money === '') {
      Alert.alert('금액을 입력해주세요');
      return;
    }

    // 여기에 금액 처리 로직 추가
    setSpreadBread(Number(money.replace(/,/g, '')));

    // 모달 닫기
    router.back();

    // 페이지 이동
    setTimeout(() => {
      router.push({ pathname: '/seperation/first' });
    }, 300); // 모달이 닫히는 시간을 고려하여 약간의 지연
  };

  return (
    <BottomSheetModal>
      <Container>
        <Content>
          <ContentText>빵뿌리기!</ContentText>
          <ContentText>입력한 금액만큼</ContentText>
          <ContentText>알바생들에게 나눠줘요!</ContentText>
        </Content>
        <InputContainer>
          <Input
            style={{ width: '100%', textAlign: 'center' }}
            placeholder="금액을 입력해주세요"
            value={money}
            onChangeText={(text) => setMoney(formatMoney(text))}
            keyboardType="numeric"
          />
        </InputContainer>
        <Button type="primary" size="fill" onPress={applyHandler}>
          빵 뿌리기
        </Button>
      </Container>
    </BottomSheetModal>
  );
};

export default FirstModal;
