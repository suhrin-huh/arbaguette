import Button from '@/components/common/Button';
import styled from '@emotion/native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore';
import { Image, Text } from 'react-native';
import CertifiedPaperBox from '@/components/boss/CertifiedPaperBox';
import CameraScreen from './camera';

const UploadBusinessCertificateScreen = () => {
  const [step, setStep] = useState<'initial' | 'take' | 'uploaded'>('initial');
  const { certifiedPaper, setCertifiedPaper } = useCertifiedPaperStore();

  const handleCameraPress = () => {
    // router.push('./upload/camera');
    setStep('take');
  };

  const handleGalleryPress = () => {
  };

  const handleResetPress = () => {
    setCertifiedPaper('');
    router.replace('/boss/config/register/upload');
  };

  const handleNextPress = () => {

  };

  useEffect(() => {
    if (certifiedPaper) {
      setStep('uploaded');
    }
  }, [certifiedPaper]);

  return (
    <Container>
      <Title>사업자 등록증을 업로드해주세요.</Title>

      {step === 'initial' &&
        <InnerContainer>
          <ButtonContainer>
            <CameraButton onPress={handleCameraPress}>
              <FontAwesome5 name="camera" size={60} color="white" />
              <CameraButtonText>촬영해 업로드</CameraButtonText>
            </CameraButton>
            <CameraButton onPress={handleGalleryPress}>
              <MaterialIcons name="image" size={60} color="white" />
              <CameraButtonText>갤러리에서 선택</CameraButtonText>
            </CameraButton>
          </ButtonContainer>
        </InnerContainer>}

      {step === 'take' && <CameraScreen setStep={setStep} />}

      {step === 'uploaded' && certifiedPaper &&
        <CertifiedPaperBox uri={certifiedPaper}>
          <HalfButtonContainer>
            <HalfWidthButton type='outlined' onPress={handleResetPress}>초기화</HalfWidthButton>
          </HalfButtonContainer>
          <HalfButtonContainer>
            <HalfWidthButton onPress={handleNextPress}>다음</HalfWidthButton >
          </HalfButtonContainer>
        </CertifiedPaperBox>
      }

    </Container>
  );
};

export default UploadBusinessCertificateScreen;

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.BACKGROUND,
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const Title = styled.Text(({ theme }) => ({
  fontSize: 28,
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  textAlign: 'left',
  marginTop: 80,
  marginBottom: 30,
}));

const InnerContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  gap: 35,
}));

const ButtonContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 30,
}));

const CameraButton = styled.Pressable(({ theme }) => ({
  width: 140,
  height: 140,
  backgroundColor: theme.color.PRIMARY,
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
}));

const CameraButtonText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.WHITE,
}));

const HalfButtonContainer = styled.View(({ theme }) => ({
  flex: 1,
}));

const HalfWidthButton = styled(Button)({
  flex: 1,
  width: '100%',
});