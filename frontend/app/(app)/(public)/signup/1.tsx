import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import Text from '@/components/common/Text';

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

const GetNameScreen = () => {
  const { role, profileImage } = useLocalSearchParams<{ role: 'BOSS' | 'CREW'; [key: string]: string }>();
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hanGulRegex = /^[가-힣]+$/;

  const handleNameInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setName(e.nativeEvent.text);
  };

  const ClearNameInput = (): void => {
    setName('');
    setIsValid(true);
    setErrorMessage(null);
  };

  const goToNext = (): void => {
    if (!name.length || !hanGulRegex.test(name)) {
      setIsValid(false);
      setErrorMessage('이름을 다시 입력해주세요.');
      return;
    }
    router.push({ pathname: '/(app)/(public)/signup/2', params: { role, profileImage, name } });
  };

  return (
    <Container>
      <ContentWrapper>
        <Text size="title" weight="bold">
          이름을 입력해주세요
        </Text>
        <InputWrapper>
          <LabeledInput
            label="이름"
            value={name}
            placeholder="이름"
            onChange={handleNameInput}
            handleDeleteText={ClearNameInput}
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
      <Button type="primary" onPress={goToNext}>
        다음
      </Button>
    </Container>
  );
};

export default GetNameScreen;
