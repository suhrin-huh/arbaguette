import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import CertifiedPaperBox from '@/components/boss/upload/CertifiedPaperBox'
import styled from '@emotion/native'
import Button from '@/components/common/Button'
import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore'
import { router } from 'expo-router'
import postCertifiedPaper from '@/services/boss/postCertifiedPaper'

const CheckScreen = () => {
  const { certifiedPaper, paperUri } = useCertifiedPaperStore()

  const handleResetPress = () => {
    router.push('./');
  };


  const handleNextPress = () => {
    postCertifiedPaper(certifiedPaper);
  };


  return (
    <CertifiedPaperBox uri={paperUri}>
      <HalfButtonContainer>
        <HalfWidthButton type='outlined' onPress={handleResetPress}>다시 선택하기</HalfWidthButton>
      </HalfButtonContainer>
      <HalfButtonContainer>
        <HalfWidthButton onPress={handleNextPress}>업로드</HalfWidthButton >
      </HalfButtonContainer>
    </CertifiedPaperBox>
  )
}

export default CheckScreen

const HalfButtonContainer = styled.View(({ theme }) => ({

  flex: 1,
}));

const HalfWidthButton = styled(Button)({
  flex: 1,
  width: '100%',
});