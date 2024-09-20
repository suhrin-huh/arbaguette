import Styled from '@emotion/native';
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

const GetNumberScreen = () => {
  const { role, name, email, password } = useLocalSearchParams<{ role: 'BOSS' | 'CREW'; [key: string]: string }>();
  const [tel, setTel] = useState('');
  const [isValid, setIsValid] = useState<boolean>();
  const handleTelInput = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setTel(e.nativeEvent.text);
    setIsValid(true);
  };
  const ClearTelInput = (): void => {
    setTel('');
    setIsValid(undefined);
    console.log('clear');
  };

  const handleSignUp = async (): Promise<void> => {
    try {
      const profileImage = Math.floor(Math.random() * 6) + 1;
      console.log(profileImage);
      const response = await instance.post(
        '/api/user',
        {
          email,
          password,
          name,
          tel,
          role,
          profileImage,
        },
        { headers: { 'Content-Type': 'application/json' } },
      );
      if (response.data.code === 200) {
        router.push('/(app)/public/login');
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <StyledTitle isHeader>전화번호를 입력해주세요.</StyledTitle>
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
      </ContentWrapper>
      <Button type="primary" disabled={!isValid} onPress={handleSignUp}>
        회원가입 완료
      </Button>
    </Container>
  );
};

export default GetNumberScreen;
