//
import Styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';

import NumPad from '@/components/common/modal/PasswordModal/NumPad';
import Progress from '@/components/common/modal/PasswordModal/Progress';
import Text from '@/components/common/Text';
// import { useCheckAccountPassword } from '@/reactQuery/querys';
import arbaguette from '@/services/arbaguette';

const GetPasswordInfo = () => {
  const { crewId, money } = useLocalSearchParams();
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string[]>([]);
  // const isValid = useCheckAccountPassword(password);
  const { mutate: sendSalary } = useMutation({
    mutationFn: arbaguette.sendSalary,
    onSuccess: () => {
      router.push({ pathname: `/(app)/boss/main/management/detail/salary/success`, params: { crewId } });
    },
    onError: () => {
      Alert.alert('송금 실패', '송금에 실패했습니다.', [
        {
          text: '확인',
          onPress: () => {
            router.push(`/(app)/boss/main/management/detail/${crewId}`);
          },
        },
      ]);
    },
  });

  const handlePassword = async (value: number) => {
    const updatedPassword = password + String(value);
    setPassword(updatedPassword);
    try {
      if (updatedPassword.length === 4) {
        const response = arbaguette.checkAccountPassword(updatedPassword);
        const isValid = (await response).data.code === 200;
        if (isValid) {
          sendSalary({ crewId: Number(crewId), money: String(money) });
        }
      }
    } catch {
      setPassword('');
      setErrorText(['비밀번호가 옳지 않습니다.', '다시 입력해주세요.']);
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
