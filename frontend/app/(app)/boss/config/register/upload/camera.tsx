import styled from '@emotion/native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { useCertifiedPaperStore } from '@/zustand/boss/useCertifiedPaperStore';
import Button from '@/components/common/Button';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type CameraScreenProps = {
  setStep: React.Dispatch<React.SetStateAction<'initial' | 'take' | 'uploaded'>>;
}

export default function CameraScreen({ setStep }: CameraScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const { certifiedPaper, setCertifiedPaper } = useCertifiedPaperStore();

  useEffect(() => {
    if (certifiedPaper) {
      setStep('uploaded');
    }
  }, [certifiedPaper]);


  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <PermissionContainer>
        <PermissionText>카메라 사용 권한이 필요합니다</PermissionText>
        <Button onPress={requestPermission}>
          권한 요청
        </Button>
      </PermissionContainer>
    );


  }

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const newPhoto = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
          exif: true,
        });
        if (newPhoto) {
          setCertifiedPaper(newPhoto.uri);
        }
      }
    } catch (error) {
      console.error("Error taking picture: ", error);
    }
  };

  return (
    <CameraScreenContainer>
      <CameraViewContainer>
        <CameraViewStyled ref={cameraRef} />
      </CameraViewContainer>
      <ButtonBox>
        <HalfButtonContainer>
          <HalfWidthButton onPress={takePicture}>
            <FontAwesome5 name="camera" size={16} color="white" />
          </HalfWidthButton>
        </HalfButtonContainer>
      </ButtonBox>
    </CameraScreenContainer>
  );
}

const CameraScreenContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  gap: 20,
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

const HalfWidthButton = styled(Button)({
  flex: 1,
  width: '100%',
});

const PermissionContainer = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const PermissionText = styled.Text({
  textAlign: 'center',
  marginBottom: 20,
});
