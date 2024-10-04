import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import NumPad from '@/components/common/modal/PasswordModal/NumPad';
import Progress from '@/components/common/modal/PasswordModal/Progress';
import Text from '@/components/common/Text';

const GetaccountPasswordScreen = () => {
  const { role, profileImage, name, email } = useLocalSearchParams<{ role: 'BOSS' | 'CREW'; [key: string]: string }>();
  const [accountPassword, setAccountPassword] = useState('');
  const [confirmedPW, setConfirmedPW] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(true);
  const [message, setErrorMessage] = useState<string | null>(null);

  const handlePassword = (value: number) => {
    const nextPassword = accountPassword + String(value); // 업데이트된 패스워드 값
    setAccountPassword(nextPassword); // 상태 업데이트
  };

  const handleConfirmedPW = (value: number) => {
    setAccountPassword('');
    setConfirmedPW('');
    const nextConfirmedPW = confirmedPW + String(value); // 업데이트된 패스워드 값
    setConfirmedPW(nextConfirmedPW); // 상태 업데이트
  };

  const goToNext = (): void => {
    if (accountPassword !== confirmedPW) {
      setIsConfirmed(false);
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    router.push({ pathname: '/(app)/(public)/signup/5', params: { role, profileImage, name, email, accountPassword } });
  };

  const Message = () => {
    if (accountPassword.length !== 4) {
      return (
        <TextBox>
          <Text size="title" weight="bold">
            은행서비스 이용시에 사용할
          </Text>
          <Text size="title" weight="bold">
            비밀번호를 설정해주세요.
          </Text>
        </TextBox>
      );
    }
  };

  const NumpadBox = () => {
    if (accountPassword.length !== 4) {
      <NumPad onPress={handlePassword} />;
      return;
    }
    if (confirmedPW) {
      setTimeout(() => {
        <NumPad onPress={handleConfirmedPW} />;
      }, 200);
    }

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
        {/* {accountPassword.length === 4 ? <NumPad onPress={handleConfirmedPW} /> : <NumPad onPress={handlePassword} />} */}
      </Container>
    );
  };

  const Container = Styled.View(({ theme }) => ({
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
};

export default GetaccountPasswordScreen;
