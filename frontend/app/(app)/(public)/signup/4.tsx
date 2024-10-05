import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import NumPad from '@/components/common/modal/PasswordModal/NumPad';
import Progress from '@/components/common/modal/PasswordModal/Progress';
import Text from '@/components/common/Text';

interface SignupProps {
  role: 'BOSS' | 'CREW';
  [key: string]: string;
}

const GetAccountPasswordScreen = () => {
  const { role, profileImage, name, email, password } = useLocalSearchParams<SignupProps>();
  const [accountPassword, setAccountPassword] = useState('');

  const handlePasswordInput = async (value: number) => {
    const updatePassword = accountPassword + String(value);
    setAccountPassword(updatePassword);
    await goToNext(updatePassword);
  };

  const handlePasswordDelete = () => {
    setAccountPassword((prev) => prev.slice(0, -1));
  };

  const goToNext = async (updatePassword: string) => {
    if (updatePassword.length === 4) {
      console.log(updatePassword);
      router.push({
        pathname: '/(app)/(public)/signup/5',
        params: { role, profileImage, name, email, password, accountPassword: updatePassword },
      });
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <TextBox>
          <Text size="title" weight="bold">
            은행서비스 이용 시에 사용할
          </Text>
          <Text size="title" weight="bold">
            비밀번호를 입력하세요.
          </Text>
        </TextBox>
        <InputWrapper>
          <Progress progress={accountPassword.length} />
        </InputWrapper>
      </ContentWrapper>
      <NumPad onPress={handlePasswordInput} deletePassword={handlePasswordDelete} />
    </Container>
  );
};

const Container = Styled.View(() => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
}));

const ContentWrapper = Styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL + 50,
  marginTop: 50,
}));

const InputWrapper = Styled.View(() => ({
  marginTop: 40,
}));

const TextBox = Styled.View(() => ({
  flexDirection: 'column',
  alignItems: 'center',
}));

export default GetAccountPasswordScreen;
