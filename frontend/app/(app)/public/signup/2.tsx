import Styled from '@emotion/native';
import type { AxiosError } from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
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

const ErrorText = Styled.Text(() => ({
  color: 'red',
  fontSize: 16,
  marginTop: 10,
}));

const GetEmailScreen = () => {
  const { role, name } = useLocalSearchParams<{ role: 'BOSS' | 'CREW'; [key: string]: string }>();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setEmail(e.nativeEvent.text);
    setIsValid(true);
  };

  const ClearEmailInput = (): void => {
    setEmail('');
    setIsValid(undefined);
    setErrorMessage(null);
  };

  interface Response {
    code: number;
  }

  const goToNext = async (): Promise<void> => {
    try {
      if (!emailRegex.test(email) || email.length > 30) {
        setIsValid(false);
        setErrorMessage('올바른 이메일을 입력하세요.');
        return;
      }

      const response = await instance.get<Response>(`/api/user?email=${email}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.code === 200) {
        router.push({ pathname: '/(app)/public/signup/3', params: { role, name, email } });
      }
    } catch (error) {
      const axiosError = error as AxiosError<Response>;

      if (axiosError.response && axiosError.response.data.code === 409) {
        setIsValid(false);
        setErrorMessage('중복된 이메일입니다.');
      } else {
        setIsValid(false);
        setErrorMessage('이메일을 다시 확인해주세요.');
      }
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <StyledTitle isHeader>이메일을 입력해주세요.</StyledTitle>
        <InputWrapper>
          <LabeledInput
            label="이메일"
            value={email}
            placeholder="이메일"
            onChange={handleEmailInput}
            handleDeleteText={ClearEmailInput}
            enableDeleteButton={true}
            isValid={isValid}
          />
        </InputWrapper>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
      </ContentWrapper>
      <Button type="primary" onPress={goToNext}>
        다음
      </Button>
    </Container>
  );
};

export default GetEmailScreen;
