import Styled from '@emotion/native';
import { useState } from 'react';

import BottomSheetModal from '@/components/common/modal/BottomSheetModal';
import NumPad from '@/components/common/modal/PasswordModal/NumPad';
import Progress from '@/components/common/modal/PasswordModal/Progress';
import Theme from '@/styles/Theme';

const PasswordField = Styled.View(({ theme }) => ({
  backgroundColor: theme.color.PRIMARY,
  flex: 1,
  height: 100,
  alignItems: 'center',
  gap: 20,
}));

const Instruction = Styled.Text(({ theme }) => ({
  color: theme.color.WHITE,
  fontSize: 20,
}));

const PasswordModal = () => {
  const [password, setPassword] = useState('');

  const handlePassword = (value: number) => {
    setPassword((prev) => prev + String(value));

    if (password.length === 4) {
      // TODO: 비밀번호 확인 로직
    }
  };

  return (
    <BottomSheetModal backgroundStyle={{ backgroundColor: Theme.color.PRIMARY }}>
      <PasswordField>
        <Instruction>인증 비밀번호 4자리</Instruction>
        <Progress progress={password.length} />
      </PasswordField>
      <NumPad onPress={handlePassword} />
    </BottomSheetModal>
  );
};

export default PasswordModal;
