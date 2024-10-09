import styled from '@emotion/native';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import React from 'react';
import { Alert } from 'react-native';

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
  const { dismiss } = useBottomSheetModal();
  const { spreadBread, setSpreadBread } = useRootStore();

  const applyHandler = () => {
    if (!spreadBread) {
      Alert.alert('금액을 입력해주세요');
      return;
    }

    dismiss();
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
            value={String(spreadBread || '')}
            onChangeText={(value) => setSpreadBread(Number(value))}
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
