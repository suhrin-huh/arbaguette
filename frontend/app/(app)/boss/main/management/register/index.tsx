import styled from '@emotion/native';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Modal, Text } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import ContainerView from '@/components/common/ScreenContainer';
import useRootStore from '@/zustand';

const SendBackground = styled(ContainerView)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  paddingVertical: 250,
}));

const RegisterModal = styled(ContainerView)(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  borderRadius: 16,
  width: 340,
  height: 400,
  paddingHorizontal: 0,
  paddingVertical: 16,
  gap: 30,
}));

const RegisterModalHeader = styled(ContainerView)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const RegisterModalHeaderTitle = styled(Text)(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  color: theme.color.BLACK,
}));

const RegisterModalContainer = styled(ContainerView)(({ theme }) => ({
  marginTop: 24,
}));

const ButtonContainer = styled(ContainerView)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  marginTop: 24,
  gap: 10,
}));

const ManagementRegisterScreen = () => {
  const { registName, registTel, setRegistName, setRegistTel } = useRootStore();

  useEffect(() => {
    console.log(registName, registTel);
  }, [registName, registTel]);

  const handleNameChange = (text: string) => {
    setRegistName(text);
  };

  const handleTelChange = (text: string) => {
    if (text.length > 11) {
      return;
    }
    if (Number.isNaN(Number(text))) {
      return;
    }

    setRegistTel(text);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        router.back();
      }}>
      <SendBackground>
        <RegisterModal>
          <RegisterModalHeader>
            <RegisterModalHeaderTitle>직원 추가하기</RegisterModalHeaderTitle>
          </RegisterModalHeader>
          <RegisterModalContainer>
            <LabeledInput
              label="이름"
              placeholder="이름을 입력해주세요."
              value={registName}
              onChangeText={handleNameChange}
              keyboardType="default"
            />
            <LabeledInput
              label="연락처"
              placeholder="연락처를 입력해주세요."
              value={registTel}
              keyboardType="number-pad"
              onChangeText={handleTelChange}
            />
          </RegisterModalContainer>
          <ButtonContainer>
            <Button type="outlined" onPress={() => router.back()}>
              닫기
            </Button>
            <Button onPress={() => router.push('/(app)/boss/contract/')}>다음</Button>
          </ButtonContainer>
        </RegisterModal>
      </SendBackground>
    </Modal>
  );
};

export default ManagementRegisterScreen;
