import Styled from '@emotion/native';
import Icon from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable } from 'react-native';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import pickImageToFormData from '@/util/boss/pickImageToFormData';

interface SignupProps {
  role: 'BOSS' | 'CREW';
  [key: string]: string;
}

const ProfileImageScreen = () => {
  const { role } = useLocalSearchParams<SignupProps>();
  const [profileImage, setProfileImage] = useState<string>('');
  const handleGalleryPress = async () => {
    try {
      const result = await pickImageToFormData();

      if (result) {
        setProfileImage(result.uri);
      }
    } catch {
      console.log('프로필사진 선택 오류');
    }
  };

  const goToNext = () => {
    router.push({ pathname: '/(app)/(public)/signup/1', params: { role, profileImage } });
  };

  return (
    <Container>
      <ContentWrapper>
        <Text size="title" weight="bold">
          프로필 사진을 업로드해 주세요.
        </Text>
        <ButtonContainer>
          {profileImage ? (
            <Pressable onPress={handleGalleryPress}>
              <Image source={{ uri: profileImage }} />
            </Pressable>
          ) : (
            <CameraButton onPress={handleGalleryPress}>
              <Icon name="picture" size={80} color="white" />
            </CameraButton>
          )}
        </ButtonContainer>
      </ContentWrapper>
      <Button type="primary" onPress={goToNext} disabled={!profileImage}>
        다음
      </Button>
    </Container>
  );
};

export default ProfileImageScreen;

const Container = Styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const ContentWrapper = Styled.View(() => ({
  flex: 1,
  marginTop: 50,
}));

const ButtonContainer = Styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
}));

const CameraButton = Styled.Pressable(({ theme }) => ({
  width: 250,
  height: 250,
  backgroundColor: theme.color.PRIMARY,
  borderRadius: 125,
  justifyContent: 'center',
  alignItems: 'center',
}));

const Image = Styled.Image(() => ({
  width: 200,
  height: 200,
  borderRadius: 100,
}));
