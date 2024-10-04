import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import PlusIcon from '@/assets/images/plus.png';
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
        console.log(123);
        console.log(role);
        setProfileImage(result.uri);
      }
    } catch (error) {
      console.log(123);
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
            <Image source={{ uri: profileImage }} />
          ) : (
            <CameraButton onPress={handleGalleryPress}>
              <Icon source={PlusIcon} />
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
  alignItems: 'center',
  marginTop: 30,
}));

const CameraButton = Styled.Pressable(({ theme }) => ({
  width: 200,
  height: 200,
  backgroundColor: theme.color.PRIMARY,
  borderRadius: 100,
  justifyContent: 'center',
  alignItems: 'center',
}));

const Icon = Styled.Image(() => ({
  width: 50,
  height: 50,
}));

const Image = Styled.Image(() => ({
  width: 200,
  height: 200,
  borderRadius: 100,
}));
