import Styled from '@emotion/native';
import { router } from 'expo-router';
import { useEffect } from 'react';

import WelcomeBg from '@/assets/images/welcome-bg.png';
import Button from '@/components/common/Button';
import useToken from '@/hooks/useToken';

const Container = Styled.View(() => ({ flex: 1 }));

const Background = Styled.ImageBackground(({ theme }) => ({
  flex: 1,
  resizeMode: 'cover',
  justifyContent: 'flex-end',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const ButtonContainer = Styled.View(() => ({
  marginTop: 10,
}));

const WelcomeScreen = () => {
  const token = useToken();

  const handleLoginButton = () => {
    router.push('/public/login');
  };

  const handleSignUpButton = () => {
    router.push('/public/signup/memberType');
  };

  useEffect(() => {
    if (!token) return;
    const role = token?.role;
    if (role === 'BOSS') {
      router.push('/(app)/boss');
    } else if (role === 'CREW') {
      router.push('/(app)/crew');
    }
  }, [token]);

  return (
    <Container>
      <Background source={WelcomeBg}>
        <ButtonContainer>
          <Button type="primary" onPress={handleLoginButton}>
            로그인
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button type="outlined" onPress={handleSignUpButton}>
            회원가입
          </Button>
        </ButtonContainer>
      </Background>
    </Container>
  );
};

export default WelcomeScreen;
