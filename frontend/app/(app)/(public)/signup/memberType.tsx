import Styled from '@emotion/native';
import { router } from 'expo-router';

import BossIcon from '@/assets/images/boss-icon.png';
import CrewIcon from '@/assets/images/crew-icon.png';

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

const StyledTitle = Styled.Text<{ isHeader?: boolean }>(({ isHeader }) => ({
  fontSize: isHeader ? 24 : 16,
  fontWeight: 'bold',
}));

const MemberTypeScreen = () => {
  const handleRole = (userRole: string): void => {
    router.push({ pathname: '/(app)/public/signup/1', params: { role: userRole } });
  };

  return (
    <Container>
      <ContentWrapper>
        <StyledTitle isHeader>회원 유형을 고르세요.</StyledTitle>
        <IconsWrapper>
          <IconButton onPress={() => handleRole('BOSS')}>
            <IconImage source={BossIcon} />
            <StyledTitle>사업자</StyledTitle>
          </IconButton>
          <IconButton onPress={() => handleRole('CREW')}>
            <IconImage source={CrewIcon} />
            <StyledTitle>개인</StyledTitle>
          </IconButton>
        </IconsWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default MemberTypeScreen;
