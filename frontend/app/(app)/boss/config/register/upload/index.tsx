import styled from '@emotion/native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert } from 'react-native';

import pickImageToFormData from '@/util/boss/pickImageToFormData';
import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore';

const UploadBusinessCertificateScreen = () => {
  const { clearCertifiedPaper, setCertifiedPaper, setPaperUri } = useCertifiedPaperStore();

  const handleCameraPress = () => {
    router.push('/boss/config/register/upload/camera');
  };

  const handleGalleryPress = async () => {
    try {
      const result = await pickImageToFormData();

      if (result) {
        const { formData, uri } = result;
        setCertifiedPaper(formData);
        setPaperUri(uri);
        router.push('/boss/config/register/upload/check');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '이미지 선택 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    clearCertifiedPaper();
  }, []);

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
