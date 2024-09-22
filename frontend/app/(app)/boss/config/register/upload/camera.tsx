import { View } from 'react-native'
import React, { useRef } from 'react'
import styled from '@emotion/native'
import Button from '@/components/common/Button'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { FontAwesome5 } from '@expo/vector-icons'
import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore'
import { router } from 'expo-router'
import takePictureToFormData from '@/util/boss/takePictureToFormData'

const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const { setCertifiedPaper, setPaperUri } = useCertifiedPaperStore();

  const takePicture = async () => {
    const result = await takePictureToFormData(cameraRef);

    if (result) {
      const { formData, uri } = result;
      setCertifiedPaper(formData);
      setPaperUri(uri);
      router.push('./check');
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <PermissionContainer>
        <PermissionText>카메라 사용 권한이 필요합니다</PermissionText>
        <Button type='primary' onPress={requestPermission}>
          권한 요청
        </Button>
      </PermissionContainer>
    );
  }

  return (
    <CameraScreenContainer>
      <CameraViewContainer>
        <CameraViewStyled ref={cameraRef} />
      </CameraViewContainer>
      <ButtonBox>
        <HalfButtonContainer>
          <Button type='primary' onPress={takePicture}>
            <FontAwesome5 name="camera" size={16} color="white" />
          </Button>
        </HalfButtonContainer>
      </ButtonBox>
    </CameraScreenContainer>
  )
}

export default CameraScreen

const PermissionContainer = styled.View({

  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const PermissionText = styled.Text({
  textAlign: 'center',
  marginBottom: 20,
});

const CameraScreenContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  gap: 40,
}));

const CameraViewContainer = styled.View(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
}));

const CameraViewStyled = styled(CameraView)({
  width: '100%',
  height: 500,
  borderRadius: 16,
  overflow: 'hidden',
});

const ButtonBox = styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  gap: 10,
}));

const HalfButtonContainer = styled.View(({ theme }) => ({
  flex: 1,
}));