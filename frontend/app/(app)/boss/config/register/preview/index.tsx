import styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import UploadInitialScreen from '@/components/boss/upload/UploadInitialScreen';
import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import arbaguette from '@/services/arbaguette';
import useRootStore from '@/zustand';

const PreviewScreen = () => {
  const { mutate: registCompany } = useMutation({
    mutationFn: arbaguette.registCompany,
    onSuccess: () => {
      router.push('./complete');
    },
    onError: () => {
      Alert.alert('오류 발생', '오류가 발생했습니다. 다시 확인해주세요.');
    },
  });
  const { companyName, ceoName, address } = useRootStore();

  const handleBackPress = () => {
    router.push('/boss/config/register/upload');
  };

  const handleNextPress = () => {
    const requestData = { name: companyName, representative: ceoName, address };
    registCompany(requestData);
  };

  return (
    <UploadInitialScreen title="사업자 등록 정보를 확인해주세요.">
      <InputContainer>
        <LabeledInput label="상호" value={companyName} />
        <LabeledInput label="대표자명" value={ceoName} />
        <LabeledInput label="주소" value={address} />
      </InputContainer>
      <ButtonBox>
        <ButtonContainer>
          <Button type="outlined" size="fill" onPress={handleBackPress}>
            다시 선택하기
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button type="primary" size="fill" onPress={handleNextPress}>
            확인
          </Button>
        </ButtonContainer>
      </ButtonBox>
    </UploadInitialScreen>
  );
};

export default PreviewScreen;

const InputContainer = styled.View(({ theme }) => ({
  marginTop: 30,
  flex: 1,
  backgroundColor: theme.color.BACKGROUND,
  paddingHorizontal: 5,
  justifyContent: 'flex-start',
  gap: 30,
}));

const ButtonBox = styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 10,
}));

const ButtonContainer = styled.View(({ theme }) => ({
  flex: 1,
  marginBottom: theme.layout.PADDING.VERTICAL,
}));
