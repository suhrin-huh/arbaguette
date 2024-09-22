import styled from '@emotion/native';
import { router } from 'expo-router';
import React from 'react';

import UploadInitialScreen from '@/components/boss/upload/UploadInitialScreen';
import Button from '@/components/common/Button';

const CompleteScreen = () => {
  const handleNextPress = () => {
    router.push('/boss/config');
  };

  return (
    <UploadInitialScreen title="사업자 등록증 업로드가 완료되었습니다.">
      <ButtonContainer>
        <Button type="primary" size="fill" onPress={handleNextPress}>
          확인
        </Button>
      </ButtonContainer>
    </UploadInitialScreen>
  );
};

export default CompleteScreen;

const ButtonContainer = styled.View(({ theme }) => ({
  flex: 1,
}));
