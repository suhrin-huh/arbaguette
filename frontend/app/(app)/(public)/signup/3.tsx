import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import Text from '@/components/common/Text';

const GetPasswordScreen = () => {
  const { role, profileImage, name, email } = useLocalSearchParams<{ role: 'BOSS' | 'CREW'; [key: string]: string }>();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlepasswordInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setPassword(e.nativeEvent.text);
    setIsValid(true);
  };

  const handlepasswordConfirmInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setPasswordConfirm(e.nativeEvent.text);
  };

  const ClearPasswordInput = (): void => {
    setPassword('');
    setIsValid(true);
  };

  const ClearpasswordConfirmInput = (): void => {
    setPasswordConfirm('');
    setIsConfirmed(true);
  };

  const goToNext = (): void => {
    if (password === '') {
      setIsValid(false);
      setErrorMessage('비밀번호를 입력해주세요.');
      return;
    }

    if (password !== passwordConfirm) {
      setIsConfirmed(false);
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    router.push({ pathname: '/(app)/(public)/signup/4', params: { role, profileImage, name, email, password } });
  };

  return (
    <Container>
      <ContentWrapper>
        <Text size="title" weight="bold">
          비밀번호를 입력해주세요.
        </Text>
        <InputWrapper>
          <LabeledInput
            label="비밀번호"
            value={password}
            placeholder="비밀번호"
            onChange={handlepasswordInput}
            handleDeleteText={ClearPasswordInput}
            enableDeleteButton={true}
            isValid={isValid}
            secureTextEntry={true}
          />
        </InputWrapper>
        {!isValid && (
          <Text size="base" weight="bold" color="gray">
            {errorMessage}
          </Text>
        )}
        <InputWrapper>
          <LabeledInput
            label="비밀번호 확인"
            value={passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={handlepasswordConfirmInput}
            handleDeleteText={ClearpasswordConfirmInput}
            enableDeleteButton={true}
            isValid={isConfirmed}
            secureTextEntry={true}
          />
        </InputWrapper>
        {!isConfirmed && (
          <Text size="base" weight="bold" color="danger">
            {errorMessage}
          </Text>
        )}
      </ContentWrapper>
      <Button type="primary" onPress={goToNext}>
        다음
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

export default GetPasswordScreen;
