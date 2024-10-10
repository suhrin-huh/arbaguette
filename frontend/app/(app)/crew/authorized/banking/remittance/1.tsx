import Styled from '@emotion/native';
import { router } from 'expo-router';
import { useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import Button from '@/components/common/Button';
import LabeledInput from '@/components/common/LabeledInput';
import Text from '@/components/common/Text';
import { useAccountBalance, useCheckAccountUser } from '@/reactQuery/querys';

const GetRemittanceInfo = () => {
  const { accountBalance } = useAccountBalance();
  const [accountNo, setAccountNo] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [isValid, setIsValid] = useState(true);
  const balance = accountBalance ? accountBalance.money : '0';
  const { userName } = useCheckAccountUser(accountNo ? accountNo : '');

  const handleAccountNo = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setAccountNo(e.nativeEvent.text);
  };

  const handleAmount = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const text = e.nativeEvent.text;
    const numericValue = text.replace(/[^0-9]/g, '');
    let amountNumber = parseInt(numericValue, 10);
    const balanceNumber = parseInt(balance, 10);

    if (isNaN(amountNumber)) {
      amountNumber = 0;
    }

    if (amountNumber > balanceNumber) {
      setAmount(balance?.toString());
      setIsValid(false);
    } else {
      setAmount(text);
      setIsValid(true);
    }
  };

  const clearAccountNo = (): void => {
    setAccountNo(undefined);
  };

  const clearAmount = (): void => {
    setAmount(undefined);
  };

  const goToNext = (): void => {
    router.push({ pathname: '/(app)/crew/authorized/banking/remittance/2', params: { accountNo, amount, userName } });
  };

  return (
    <Container>
      <ContentWrapper>
        <Text size="sub" weight="bold">
          계좌번호와 금액을 입력해주세요.
        </Text>
        <InputWrapper>
          <LabeledInput
            label="계좌번호"
            value={accountNo}
            keyboardType="number-pad"
            placeholder="숫자만 입력해주세요."
            onChange={handleAccountNo}
            handleDeleteText={clearAccountNo}
            enableDeleteButton={true}
            isValid={true}
          />
        </InputWrapper>
        <InputWrapper>
          <LabeledInput
            label="금액"
            value={amount}
            keyboardType="numeric"
            placeholder="금액을 입력해주세요."
            onChange={handleAmount}
            handleDeleteText={clearAmount}
            enableDeleteButton={true}
            isValid={isValid}
          />
        </InputWrapper>
      </ContentWrapper>
      <Button type="primary" onPress={goToNext} disabled={!accountNo || !amount || !userName}>
        다음
      </Button>
    </Container>
  );
};

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

export default GetRemittanceInfo;
