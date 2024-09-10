import Styled from '@emotion/native';
import { useRouter } from 'expo-router';

// import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import WelcomeBg from '@/assets/images/welcome-bg.png';
import Button from '@/components/common/Button';

const Container = Styled.View(() => ({ flex: 1 }));

const Background = Styled.ImageBackground(({ theme }) => ({
  flex: 1,
  resizeMode: 'cover',
  justifyContent: 'flex-end',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL, // Layout.ts의 값을 사용하여 padding 설정
  paddingVertical: theme.layout.PADDING.VERTICAL, // Layout.ts의 값을 사용하여 padding 설정
}));

const ButtonContainer = Styled.View(() => ({
  marginTop: 10,
}));

const WelcomeScreen = () => {
  const router = useRouter(); // useRouter 훅을 사용하여 네비게이션 객체 가져오기

  const handleLoginButton = () => {
    router.push('/public/login');
  };

  const handleSignUpButton = () => {
    router.push('/public/signup/memberType');
  };

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
