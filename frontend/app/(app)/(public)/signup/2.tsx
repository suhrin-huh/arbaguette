import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import Text from '@/components/common/Text';
import { useEmailCheck } from '@/reactQuery/querys';

const GetEmailScreen = () => {
  const { role, profileImage, name } = useLocalSearchParams<{ role: 'BOSS' | 'CREW'; [key: string]: string }>();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { isUnique } = useEmailCheck(email);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setIsValid(true);
    setErrorMessage(null);
    setEmail(e.nativeEvent.text);
  };

  const ClearEmailInput = (): void => {
    setEmail('');
    setErrorMessage(null);
  };

  const goToNext = (): void => {
    if (!emailRegex.test(email) || email.length > 30) {
      setIsValid(false);
      setErrorMessage('올바른 이메일을 입력하세요.');
    } else if (!isUnique) {
      setIsValid(false);
      setErrorMessage('중복된 아이디입니다.');
    } else {
      setErrorMessage(null);
      router.push({ pathname: '/(app)/(public)/signup/3', params: { role, profileImage, name, email } });
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Text size="title" weight="bold">
          이메일을 입력해주세요.
        </Text>
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
        {errorMessage && (
          <Text size="base" weight="bold" color="danger">
            {errorMessage}
          </Text>
        )}
      </ContentWrapper>
      <Button type="primary" onPress={goToNext} disabled={!email.length}>
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

export default GetEmailScreen;
