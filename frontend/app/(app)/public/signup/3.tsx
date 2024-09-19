import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';

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

const GetPasswordScreen = () => {
  const { role, name, email } = useLocalSearchParams<{ role: 'BOSS' | 'CREW'; [key: string]: string }>();
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isValid, setIsValid] = useState<boolean>();
  const [isConfirmed, setIsConfirmed] = useState<boolean>();

  const handlepasswordInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setPassword(e.nativeEvent.text);
    setIsValid(true);
  };

  const handlepasswordConfirmInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const changed = e.nativeEvent.text;
    setPasswordConfirm(changed);
    if (changed === password) {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
    console.log(changed, isConfirmed);
  };

  const ClearPasswordInput = (): void => {
    setPassword('');
    setIsValid(undefined);
    console.log('clear');
  };

  const ClearpasswordConfirmInput = (): void => {
    setPasswordConfirm('');
    setIsConfirmed(undefined);
    console.log('clear');
  };

  const goToNext = (): void => {
    router.push({ pathname: '/(app)/public/signup/4', params: { role, name, email, password } });
  };

  return (
    <Container>
      <ContentWrapper>
        <StyledTitle isHeader>비밀번호를 입력해주세요.</StyledTitle>
        <InputWrapper>
          <LabeledInput
            label="비밀번호"
            value={password}
            placeholder="비밀번호"
            onChange={handlepasswordInput}
            handleDeleteText={ClearPasswordInput}
            enableDeleteButton={true}
            isValid={isValid}
          />
        </InputWrapper>
        <InputWrapper>
          <LabeledInput
            label="비밀번호 확인"
            value={passwordConfirm}
            placeholder="비밀번호 확인"
            onChange={handlepasswordConfirmInput}
            handleDeleteText={ClearpasswordConfirmInput}
            enableDeleteButton={true}
            isValid={isConfirmed}
          />
        </InputWrapper>
      </ContentWrapper>
      <Button type="primary" onPress={goToNext} disabled={!!password.length && !(isValid && isConfirmed)}>
        다음
      </Button>
    </Container>
  );
};

export default GetPasswordScreen;
