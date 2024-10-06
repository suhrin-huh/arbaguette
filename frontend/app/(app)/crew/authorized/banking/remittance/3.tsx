import Styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

import NumPad from '@/components/common/modal/PasswordModal/NumPad';
import Progress from '@/components/common/modal/PasswordModal/Progress';
import Text from '@/components/common/Text';
import { useCheckAccountPassword } from '@/reactQuery/querys';
import arbaguette from '@/services/arbaguette';

interface RemittanceInfo {
  [key: string]: string;
}
const GetPasswordInfo = () => {
  const { accountNo, amount } = useLocalSearchParams<RemittanceInfo>();
  const [password, setPassword] = useState('');
  const [resText, setResText] = useState('');
  // const { mutate: remittance } = useMutation({
  //   mutationFn: arbaguette.remittance,
  //   onSuccess: async (response) => {
  //     console.log(response);
  //   },
  //   onError: async (error: AxiosError) => {
  //     setPassword('');
  //     console.log(error);
  //   },
  // });

  const handlePassword = (value: number) => {
    const updatedPassword = password + String(value);
    setPassword(updatedPassword);
    if (updatedPassword.length === 4) {
      const requestData = {
        accountNo,
        amount,
        password,
      };
      // RemittanceInfo(requestData);
      router.push('/crew/authorized/banking/remittance/success');
    }
  };

  const handlePasswordDelete = (value: number) => {
    setPassword((prev) => prev.slice(0, -1));
  };

  return (
    <Container>
      <ContentBox>
        {resText ? (
          <Text size="title" weight="bold">
            {resText}
          </Text>
        ) : (
          <Text size="title" weight="bold">
            비밀번호를 입력하세요.
          </Text>
        )}
        <Text>{password}</Text>
        <Progress progress={password.length} />
      </ContentBox>
      <NumPad onPress={handlePassword} deletePassword={handlePasswordDelete} />
    </Container>
  );
};

const Container = Styled.View(({ theme }) => ({
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
