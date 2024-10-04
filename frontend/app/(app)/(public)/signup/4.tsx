import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import NumPad from '@/components/common/modal/PasswordModal/NumPad';
import Progress from '@/components/common/modal/PasswordModal/Progress';
import Text from '@/components/common/Text';

interface SignupProps {
  role: 'BOSS' | 'CREW';
  [key: string]: string;
}

const GetaccountPasswordScreen = () => {
  const { role, profileImage, name, email } = useLocalSearchParams<SignupProps>();
  const [accountPassword, setAccountPassword] = useState('');
  const [confirmedPW, setConfirmedPW] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(true);

  const handlePassword = (value: number) => {
    const nextPassword = accountPassword + String(value); // 업데이트된 패스워드 값
    setAccountPassword(nextPassword); // 상태 업데이트
  };

  const handleConfirmedPW = async (value: number) => {
    const nextConfirmedPW = confirmedPW + String(value); // 업데이트된 패스워드 값
    setConfirmedPW(nextConfirmedPW); // 상태 업데이트
    await goToNext();
  };

  // 이쪽 로직 처리하기!!!
  const goToNext = async (): Promise<void> => {
    if (confirmedPW.length === 4 && accountPassword !== confirmedPW) {
      setIsConfirmed(false);
      return;
      router.push({
        pathname: '/(app)/(public)/signup/5',
        params: { role, profileImage, name, email, accountPassword },
      });
    }
    setIsConfirmed(true);
  };

  const Message = () => {
    if (accountPassword.length !== 4) {
      return (
        <TextBox>
          <Text size="title" weight="bold">
            은행서비스 이용 시에 사용할
          </Text>
          <Text size="title" weight="bold">
            비밀번호를 설정해 주세요.
          </Text>
        </TextBox>
      );
    }
    if (!isConfirmed) {
      return (
        <TextBox>
          <Text size="title" weight="bold">
            일치하지 않습니다.
          </Text>
          <Text size="title" weight="bold">
            다시 입력해주세요.
          </Text>
        </TextBox>
      );
    }
    return (
      <TextBox>
        <Text size="title" weight="bold">
          한 번 더 입력해 주세요.
        </Text>
      </TextBox>
    );
  };
  const deletePassword = () => {
    if (accountPassword) {
      setAccountPassword((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const deleteConfirmPW = () => {
    if (confirmedPW) {
      setConfirmedPW((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const NumpadBox = () => {
    if (accountPassword.length < 4) {
      return <NumPad onPress={handlePassword} deletePassword={deletePassword} />;
    }
    return <NumPad onPress={handleConfirmedPW} deletePassword={deleteConfirmPW} />;
  };

  return (
    <Container>
      <ContentWrapper>
        <Message />
        <InputWrapper>
          {accountPassword.length === 4 ? (
            <Progress progress={confirmedPW.length} />
          ) : (
            <Progress progress={accountPassword.length} />
          )}
        </InputWrapper>
      </ContentWrapper>
      <NumpadBox />
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
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: 30,
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

export default GetaccountPasswordScreen;
