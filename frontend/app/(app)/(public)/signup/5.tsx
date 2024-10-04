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
  const { role, profileImage, name, email, password, accountPassword } = useLocalSearchParams<SignupProps>();
  const [confirmedPW, setConfirmedPW] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(true);

  const handlePasswordInput = async (value: number) => {
    const updatePassword = confirmedPW + String(value);
    setConfirmedPW(updatePassword);
    await checkPasswordsMatch(updatePassword);
  };

  const handlePasswordDelete = () => {
    setConfirmedPW((prev) => prev.slice(0, -1));
  };

  const checkPasswordsMatch = async (updatePassword: string) => {
    const isFull = updatePassword.length === 4;
    const isEqual = accountPassword === updatePassword;
    if (isFull) {
      if (isEqual) {
        router.push({
          pathname: '/(app)/(public)/signup/6',
          params: { role, profileImage, name, email, password, accountPassword },
        });
        return;
      }
      setIsConfirmed(false);
      setConfirmedPW('');
    }
  };

  const renderMessage = () => {
    if (!isConfirmed) {
      return <MessageBox text1="일치하지 않습니다." text2="다시 입력해주세요." />;
    }
    return <MessageBox text1="한 번 더 입력해 주세요." />;
  };

  const MessageBox = ({ text1, text2 }: { text1: string; text2?: string }) => (
    <TextBox>
      <Text size="title" weight="bold">
        {text1}
      </Text>
      {text2 && (
        <Text size="title" weight="bold">
          {text2}
        </Text>
      )}
    </TextBox>
  );

  return (
    <Container>
      <ContentWrapper>
        {renderMessage()}
        <InputWrapper>
          <Progress progress={accountPassword.length === 4 ? confirmedPW.length : accountPassword.length} />
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
