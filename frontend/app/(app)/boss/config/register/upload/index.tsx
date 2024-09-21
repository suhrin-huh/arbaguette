import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore';
import styled from '@emotion/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';

const UploadBusinessCertificateScreen = () => {
  const { setCertifiedPaper } = useCertifiedPaperStore()

  const handleCameraPress = () => {

    router.push('./upload/camera');
  };

  const handleGalleryPress = () => {
    router.push('./upload/gallery');
  };

  useEffect(() => {
    setCertifiedPaper('')
  }, [])

  return (

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
    </InnerContainer>
  );
};

export default UploadBusinessCertificateScreen;

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

