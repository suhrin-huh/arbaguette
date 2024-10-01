import styled from '@emotion/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Modal, Text } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import ContainerView from '@/components/common/ScreenContainer';
import keys from '@/reactQuery/keys';
import arbaguette from '@/services/arbaguette';
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
  const { registName, registTel, registCompanyId, setRegistName, setRegistTel, setRegistCrewId } = useRootStore();
  const telFormat = registTel.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

  // const queryClient = useQueryClient();
  const { mutate: registCrewMember } = useMutation({
    mutationFn: arbaguette.registCrewMember,
    onSuccess: async (data) => {
      const crewId = data?.data?.data?.crewId;
      setRegistCrewId(crewId);
    },
    onError: (error) => {
      console.log(error);

      if (error instanceof AxiosError && error?.response?.status !== 418) {
        Alert.alert(error?.response?.data?.message);
      } else {
        Alert.alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
      }

      router.back();
    },
  });

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

  const handleNext = () => {
    console.log(registName, telFormat, registCompanyId);
    const data = registCrewMember({ name: registName, tel: telFormat, companyId: registCompanyId });

    console.log(data);
    // setRegistCrewId(data?.data.crewId);
    // `data.data.data.crewId`의 정확한 타입이 명시되므로 타입 에러 해결
    router.push('/(app)/boss/contract/');
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
            <Button onPress={handleNext}>다음</Button>
          </ButtonContainer>
        </RegisterModal>
      </SendBackground>
    </Modal>
  );
};

export default ManagementRegisterScreen;
