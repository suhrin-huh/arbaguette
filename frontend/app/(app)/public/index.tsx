import Styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

import WelcomeBg from '@/assets/images/welcome-bg.png';
import Button from '@/components/common/Button';

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
  const handleLoginButton = () => {
    router.push('/public/login');
  };

  const handleSignUpButton = () => {
    router.push('/public/signup/memberType');
  };

  interface Decode {
    iat: number;
    role: string;
    string: string;
  }

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (!token) return;
      try {
        const decoded: Decode = jwtDecode<Decode>(token);
        const role: string | undefined = decoded.role;
        if (role === 'BOSS') {
          router.push('/(app)/boss');
        } else {
          router.push('/(app)/crew');
        }
      } catch (error) {
        console.error('Failed to decode token', error);
        AsyncStorage.removeItem('accessToken');
      }
    })();
  }, []);

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
