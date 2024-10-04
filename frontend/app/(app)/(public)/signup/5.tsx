import Styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import Text from '@/components/common/Text';
import arbaguette from '@/services/arbaguette';

const GetTelScreen = () => {
  const { role, profileImage, name, email, password, accountPassword } = useLocalSearchParams<{
    role: 'BOSS' | 'CREW';
    [key: string]: string;
  }>();
  const [tel, setTel] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const phoneRegex = /^010-\d{4}-\d{4}$/;
  const { mutate: signup } = useMutation({
    mutationFn: arbaguette.signup,
    onSuccess: async (response) => {
      router.dismissAll();
      router.replace('/(public)/login');
    },
    onError: (error: AxiosError) => {
      setIsValid(false);
      if (error.status === 409) {
        setErrorMessage('중복된 전화번호입니다.');
      } else {
        setErrorMessage('올바른 전화번호를 입력해주세요.');
      }
    },
  });

  const handleTelInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setTel(e.nativeEvent.text);
    setIsValid(true);
  };
  const ClearTelInput = (): void => {
    setTel('');
    setIsValid(true);
  };

  const handleSignUp = () => {
    if (!phoneRegex.test(tel)) {
      setIsValid(false);
      setErrorMessage('올바른 전화번호를 입력해주세요.');
      return;
    }
    // const profileImage = Math.floor(Math.random() * 6) + 1;
    const requestData = {
      email,
      password,
      name,
      tel,
      role,
      profileImage,
      accountPassword,
    };
    signup(requestData);
  };

  return (
    <Container>
      <ContentWrapper>
        <Text size="title" weight="bold">
          전화번호를 입력해주세요.
        </Text>
        <InputWrapper>
          <LabeledInput
            label="전화번호"
            value={tel}
            placeholder="010-0000-0000"
            onChange={handleTelInput}
            handleDeleteText={ClearTelInput}
            enableDeleteButton={true}
            isValid={isValid}
          />
        </InputWrapper>
        {errorMessage && (
          <Text size="base" weight="bold" color="danger">
            {errorMessage}
          </Text>
        )}
      </ContentWrapper>
      <Button type="primary" disabled={!isValid} onPress={handleSignUp}>
        회원가입 완료
      </Button>
    </Container>
  );
};

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

export default GetTelScreen;
