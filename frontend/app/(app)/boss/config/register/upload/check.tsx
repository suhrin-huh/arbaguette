import styled from '@emotion/native';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

import CertifiedPaperBox from '@/components/boss/upload/CertifiedPaperBox';
import Button from '@/components/common/Button';
import postCertifiedPaper from '@/services/boss/postCertifiedPaper';
import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore';
import { useCompanyInfoStore } from '@/zustand/boss/useCompanyInfoStore';

const CheckScreen = () => {
  const { certifiedPaper, paperUri } = useCertifiedPaperStore();
  const { setCompanyInfo } = useCompanyInfoStore();

  const handleResetPress = () => {
    router.push('./');
  };

  const handleNextPress = async () => {
    try {
      const { name, address, representative } = await postCertifiedPaper(certifiedPaper);
      setCompanyInfo({ companyName: name, address, ceoName: representative });
      router.push('/boss/config/register/preview');
    } catch (error) {
      console.error(error);
      Alert.alert('업로드 실패', '업로드 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <CertifiedPaperBox uri={paperUri}>
      <HalfButtonContainer>
        <HalfWidthButton type="outlined" onPress={handleResetPress}>
          다시 선택하기
        </HalfWidthButton>
      </HalfButtonContainer>
      <HalfButtonContainer>
        <HalfWidthButton onPress={handleNextPress}>업로드</HalfWidthButton>
      </HalfButtonContainer>
    </CertifiedPaperBox>
  );
};

export default CheckScreen;

const HalfButtonContainer = styled.View(({ theme }) => ({
  flex: 1,
}));

const HalfWidthButton = styled(Button)({
  flex: 1,
  width: '100%',
});
