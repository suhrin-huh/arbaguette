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

const GetNameScreen = () => {
  const { role } = useLocalSearchParams<{ role: 'BOSS' | 'CREW' }>();
  const [name, setName] = useState('');
  const [isValid, setIsValid] = useState<boolean>();
  const handleNameInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setName(e.nativeEvent.text);
    setIsValid(true);
    console.log(name);
  };

  const ClearNameInput = (): void => {
    setName('');
    setIsValid(undefined);
    console.log('clear');
  };

  const goToNext = (): void => {
    router.push({ pathname: '/(app)/public/signup/2', params: { role: role, name: name } });
  };

  return (
    <Container>
      <ContentWrapper>
        <StyledTitle isHeader>이름을 입력해주세요</StyledTitle>
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
      </ContentWrapper>
      <Button type="primary" onPress={goToNext} disabled={name.length === 0}>
        다음
      </Button>
    </Container>
  );
};

export default GetNameScreen;