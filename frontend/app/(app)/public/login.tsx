import Styled from '@emotion/native';
import { router } from 'expo-router';
import { useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import instance from '@/configs/axios';

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

const LoginScreen = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      const response = await instance.post(
        '/login',
        {
          email,
          password,
        },
        { headers: { 'Content-Type': 'application/json' } },
      );
      console.log(response);
      if (response.data.code === 200) {
        router.push('/(app)/public');
      }
    } catch (error) {
      console.log(error);
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
            placeholder="비밀번호를 입력하세요"
            onChange={handlePasswordInput}
            handleDeleteText={clearPasswordInput}
            enableDeleteButton={true}
          />
        </InputWrapper>
      </ContentWrapper>
      <Button type="primary" onPress={handleLogin}>
        로그인
      </Button>
    </Container>
  );
};

export default LoginScreen;
