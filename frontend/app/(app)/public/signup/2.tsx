import Styled from '@emotion/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

const GetEmailScreen = () => {
  const router = useRouter();
  const { role, name } = useLocalSearchParams<{ role: 'BOSS' | 'CREW'; [key: string]: string }>();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState<boolean>();
  const handleEmailInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setEmail(e.nativeEvent.text);
    setIsValid(true);
    console.log(email);
  };

  const ClearEmailInput = (): void => {
    setEmail('');
    setIsValid(undefined);
    console.log('clear');
  };

  const goToNext = (): void => {
    router.push({ pathname: '/(app)/public/signup/3', params: { role, name, email } });
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
      </ContentWrapper>
      <Button type="primary" onPress={goToNext} disabled={!!email.length}>
        다음
      </Button>
    </Container>
  );
};

export default GetEmailScreen;
