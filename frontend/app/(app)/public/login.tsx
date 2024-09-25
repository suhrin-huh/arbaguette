import Styled from '@emotion/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AxiosError } from 'axios';
import { router } from 'expo-router';
import { useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import arbaguette from '@/services/arbaguette';

const Container = Styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const ContentWrapper = Styled.View(() => ({
  marginTop: 50,
}));

const InputWrapper = Styled.View(() => ({
  marginTop: 40,
}));

const StyledTitle = Styled.Text<{ isHeader?: boolean }>(({ isHeader }) => ({
  fontSize: isHeader ? 24 : 16,
  fontWeight: 'bold',
}));

const ErrorText = Styled.Text(() => ({
  color: 'red',
  fontSize: 16,
  marginTop: 10,
}));

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setEmail(e.nativeEvent.text);
  };

  const clearEmailInput = (): void => {
    setEmail('');
  };

  const handlePasswordInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setPassword(e.nativeEvent.text);
  };

  const clearPasswordInput = (): void => {
    setPassword('');
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await arbaguette.login({ email, password });

      if (response.data.code === 200) {
        const { accessToken, role } = response.data.data;

        await AsyncStorage.setItem('accessToken', accessToken);

        if (role === 'BOSS') {
          router.push('/(app)/boss');
        } else if (role === 'CREW') {
          router.push('/(app)/crew');
        }
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      const err = axiosError.response?.data;
      if (err && err.code === 404) {
        setIsValid(false);
        setErrorMessage('아이디와 비밀번호를 확인해주세요.');
      } else {
        console.error('An error occurred:', error);
      }
    }
  };
  return (
    <Container>
      <ContentWrapper>
        <StyledTitle isHeader>로그인</StyledTitle>
        <InputWrapper>
          <LabeledInput
            label="이메일"
            value={email}
            isValid={isValid}
            placeholder="이메일을 입력하세요"
            onChange={handleEmailInput}
            handleDeleteText={clearEmailInput}
            enableDeleteButton={true}
          />
        </InputWrapper>
        <InputWrapper>
          <LabeledInput
            label="비밀번호"
            value={password}
            isValid={isValid}
            placeholder="비밀번호를 입력하세요"
            onChange={handlePasswordInput}
            handleDeleteText={clearPasswordInput}
            enableDeleteButton={true}
            secureTextEntry={true}
          />
        </InputWrapper>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </ContentWrapper>
      <Button type="primary" onPress={handleLogin}>
        로그인
      </Button>
    </Container>
  );
};

export default LoginScreen;
