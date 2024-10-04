import Styled from '@emotion/native';
import { router } from 'expo-router';

import BossIcon from '@/assets/images/boss-icon.png';
import CrewIcon from '@/assets/images/crew-icon.png';
import Text from '@/components/common/Text';

const MemberTypeScreen = () => {
  const handleRole = (role: string): void => {
    router.push({ pathname: '/(app)/public/signup/profileImage', params: { role } });
  };

  return (
    <Container>
      <ContentWrapper>
        <Text size="title" weight="bold">
          회원 유형을 고르세요.
        </Text>
        <IconsWrapper>
          <IconButton onPress={() => handleRole('BOSS')}>
            <IconImage source={BossIcon} />
            <Text size="title" weight="bold">
              사업자
            </Text>
          </IconButton>
          <IconButton onPress={() => handleRole('CREW')}>
            <IconImage source={CrewIcon} />
            <Text size="title" weight="bold">
              개인
            </Text>
          </IconButton>
        </IconsWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = Styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const ContentWrapper = Styled.View(() => ({
  marginTop: 50,
}));

const IconsWrapper = Styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  paddingTop: 60,
}));

const IconButton = Styled.Pressable(() => ({
  flexDirection: 'column',
  alignItems: 'center',
  width: 150,
  aspectRatio: 0.8,
}));

const IconImage = Styled.Image(() => ({
  width: 150,
  height: 150,
  flex: 1,
  resizeMode: 'cover',
  borderRadius: 10,
}));

export default MemberTypeScreen;
