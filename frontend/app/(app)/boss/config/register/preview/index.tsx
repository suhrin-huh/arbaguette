import styled from '@emotion/native';
import { router } from 'expo-router';
import React from 'react';

import UploadInitialScreen from '@/components/boss/upload/UploadInitialScreen';
import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import { useCompanyInfoStore } from '@/zustand/boss/useCompanyInfoStore';

const PreviewScreen = () => {
  const { companyName, ceoName, address } = useCompanyInfoStore();

  const handleBackPress = () => {
    router.push('/boss/config/register/upload');
  };

  const handleNextPress = () => {
    router.push('./complete');
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
