import Button from '@/components/common/Button';
import styled from '@emotion/native';
import { router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Alert, Text } from 'react-native';

const UploadBusinessCertificateScreen = () => {
  const [imageUploaded, setImageUploaded] = useState(false);

  return (
    <Container>
      <Title>사업자 등록증을 업로드해주세요.</Title>
      <InnerContainer>
        <ButtonContainer>
          <CameraButton>
            <FontAwesome5 name="camera" size={60} color="white" />
            <ButtonText>촬영해 업로드</ButtonText>
          </CameraButton>
          <CameraButton>
            <MaterialIcons name="image" size={60} color="white" />
            <ButtonText>갤러리에서 선택</ButtonText>
          </CameraButton>
        </ButtonContainer>

        {imageUploaded && <Button>다음</Button>}
      </InnerContainer>
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

const ButtonText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: 'white',
}));
