import Styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useState } from 'react';

import NumPad from '@/components/common/modal/PasswordModal/NumPad';
import Progress from '@/components/common/modal/PasswordModal/Progress';
import Text from '@/components/common/Text';
import { useCheckAccountPassword } from '@/reactQuery/querys';
import arbaguette from '@/services/arbaguette';

interface RemittanceInfo {
  accountNo: string;
  amount: string;
}
const GetPasswordInfo = ({ accountNo, amount }: RemittanceInfo) => {
  const [password, setPassword] = useState('');
  const [resText, setResText] = useState('');
  const { isCorrect } = useCheckAccountPassword(password);
  const { mutate: remittance } = useMutation({
    mutationFn: arbaguette.remittance,
    onSuccess: async (response) => {
      console.log(response);
    },
    onError: async (error: AxiosError) => {
      setPassword('');
      console.log(error);
    },
  });

  const handlePassword = (value: number) => {
    const nextPassword = password + String(value); // 업데이트된 패스워드 값
    setPassword(nextPassword); // 상태 업데이트

    console.log(isCorrect);

    if (nextPassword.length === 4) {
      if (!isCorrect) {
        setTimeout(() => {
          setPassword('');
          setResText(`비밀번호를 다시 입력해주세요`);
          console.log('실패');
        }, 300);
        return;
      }
      remittance({ account: accountNo, money: parseInt(amount, 10), password });
    }
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
      <NumPad onPress={handlePassword} />
    </Container>
  );
};

const Container = Styled.View(({ theme }) => ({
  flex: 1,
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  // paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  // paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const ContentBox = Styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 30,
  // backgroundColor: theme.color.PRIMARY,
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

export default GetPasswordInfo;
