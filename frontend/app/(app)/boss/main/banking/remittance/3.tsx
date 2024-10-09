import Styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import NumPad from '@/components/common/modal/PasswordModal/NumPad';
import Progress from '@/components/common/modal/PasswordModal/Progress';
import Text from '@/components/common/Text';
import arbaguette from '@/services/arbaguette';

interface RemittanceInfo {
  [key: string]: string;
}
const GetPasswordInfo = () => {
  const { accountNo, amount } = useLocalSearchParams<RemittanceInfo>();
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string[]>([]);
  const { mutate: remittance } = useMutation({
    mutationFn: arbaguette.remittance,
    onSuccess: async () => {
      router.push('/(app)/boss/main/banking/success');
    },
    onError: async (error) => {
      console.log(error);
      setPassword('');
      setErrorText(['비밀번호가 옳지 않습니다.', '다시 입력해주세요.']);
    },
  });

  const handlePassword = (value: number) => {
    const updatedPassword = password + String(value);
    setPassword(updatedPassword);
    if (updatedPassword.length === 4) {
      const requestData = {
        account: accountNo,
        money: amount,
        password: updatedPassword,
      };
      console.log(requestData);
      remittance(requestData);
    }
  };

  const handlePasswordDelete = () => {
    setPassword((prev) => prev.slice(0, -1));
  };

  return (
    <Container>
      <ContentBox>
        {errorText.length ? (
          errorText.map((text, idx) => (
            <Text size="title" weight="bold" key={idx}>
              {text}
            </Text>
          ))
        ) : (
          <Text size="title" weight="bold">
            비밀번호를 입력하세요.
          </Text>
        )}
        <Progress progress={password.length} />
      </ContentBox>
      <NumPad onPress={handlePassword} deletePassword={handlePasswordDelete} />
    </Container>
  );
};

const Container = Styled.View(() => ({
  flex: 1,
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
}));

const ContentBox = Styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 30,
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

export default GetPasswordInfo;
