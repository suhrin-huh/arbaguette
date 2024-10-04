import Styled from '@emotion/native';
import { router } from 'expo-router';

import WhiteLogo from '@/assets/images/white-logo.png';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import { useAccountBalance } from '@/reactQuery/querys';
import useRootStore from '@/zustand';

const BankingCard = () => {
  const { accountBalance } = useAccountBalance();
  const { account, money } = accountBalance;
  const { role } = useRootStore.getState();
  const formatToAccountNo = (number: string): string => number.replace(/(\d{6})(\d{2})(\d+)/, '$1-$2-$3');
  const formattedNumber = (number: string): string => `${parseInt(number, 10).toLocaleString('ko-KR')} 원`;

  const navigateToTransaction = () => {
    if (role === 'BOSS') {
      router.push('/(app)/boss/main/banking/transaction');
    } else {
      router.push('/(app)/crew/authorized/banking/transaction');
    }
  };
  const navigateToRemittance = () => {
    console.log(role);
    if (role === 'BOSS') {
      router.push('/(app)/boss/main/banking/remittance/1');
    } else {
      router.push('/(app)/crew/authorized/banking/remittance/1');
    }
  };

  return (
    <BankingContainer>
      <LogoBox>
        <LogoImage source={WhiteLogo} />
        <Text size="sub" weight="bold" color="white">
          B-Pay
        </Text>
      </LogoBox>
      <AccountInfo>
        <Text size="base" color="gray">
          {accountBalance && formatToAccountNo(account)}
        </Text>
        <Text size="title" weight="bold">
          {accountBalance && formattedNumber(money)}
        </Text>
        <ButtonGroup>
          <Button textStyle={{ fontWeight: 'bold' }} onPress={navigateToRemittance}>
            송금
          </Button>
          <Button textStyle={{ fontWeight: 'bold' }} onPress={navigateToTransaction}>
            조회
          </Button>
        </ButtonGroup>
      </AccountInfo>
    </BankingContainer>
  );
};

const LogoImage = Styled.Image(() => ({
  height: '100%',
  resizeMode: 'contain',
  width: 90,
}));

const LogoBox = Styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 10,
  paddingHorizontal: 10,
  gap: 5,
}));

const BankingContainer = Styled.View(({ theme }) => ({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.color.PRIMARY,
  borderRadius: theme.layout.BORDER.SECONDARY,
  padding: 10,
}));

const AccountInfo = Styled.View(({ theme }) => ({
  flexDirection: 'column',
  width: '100%',
  borderRadius: theme.layout.BORDER.SECONDARY,
  backgroundColor: 'white',
  paddingHorizontal: 15,
  paddingVertical: 10,
}));

const ButtonGroup = Styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 10,
  paddingTop: 10,
}));

export default BankingCard;
