import Styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, View } from 'react-native';

import FireworkImage from '@/assets/images/firework.png';
import PayrollImage from '@/assets/images/payroll.png';
import WhiteLogo from '@/assets/images/white-logo.png';
import Button from '@/components/common/Button';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import Text from '@/components/common/Text';
import ExpectedSalaryCard from '@/components/crew/Card/ExpectedSalaryCard';
import { useAccountBalance } from '@/reactQuery/querys';

const CrewBankingScreen = () => {
  const { accountBalance } = useAccountBalance();
  const formatToAccountNo = (number: string): string => number.replace(/(\d{6})(\d{2})(\d+)/, '$1-$2-$3');
  const formatToCurrency = (money: string): string => money.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <ScreenContainer>
      <CenterHeaderbar left="none" title="빵Pay" right="bell" />
      <AccountSection>
        <LogoBox>
          <LogoImage source={WhiteLogo} />
          <Text size="sub" weight="bold" color="white">
            B-Pay
          </Text>
        </LogoBox>
        <AccountDetailsBox>
          <Text size="base" color="gray">
            {accountBalance && formatToAccountNo(accountBalance?.account)}
          </Text>
          <Text size="title" weight="bold">
            {accountBalance && formatToCurrency('1234567' + accountBalance?.money)} 원
          </Text>
          <ButtonGroup>
            <Button textStyle={{ fontWeight: 'bold' }}>송금</Button>
            <Button
              textStyle={{ fontWeight: 'bold' }}
              onPress={() => router.push('/(app)/crew/authorized/banking/transaction')}>
              조회
            </Button>
          </ButtonGroup>
        </AccountDetailsBox>
      </AccountSection>
      <ActionButtonGroup>
        <ActionButton onPress={() => router.push('/crew/authorized/banking/certification')}>
          <View>
            <Text size="sub" weight="bold">
              {'급여명세서\n확인하기'}
            </Text>
          </View>
          <Image source={PayrollImage} style={{ resizeMode: 'contain', width: 90, height: 90, marginLeft: 'auto' }} />
        </ActionButton>
        <ActionButton>
          <View>
            <Text size="sub" weight="bold">
              {'친구에게\n빵뿌리기'}
            </Text>
          </View>
          <Image source={FireworkImage} style={{ resizeMode: 'contain', width: 90, height: 90, marginLeft: 'auto' }} />
        </ActionButton>
      </ActionButtonGroup>
      <ExpectedSalaryCard />
    </ScreenContainer>
  );
};

export default CrewBankingScreen;

const ScreenContainer = Styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  gap: 30,
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

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

const AccountSection = Styled.View(({ theme }) => ({
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.color.PRIMARY,
  borderRadius: theme.layout.BORDER.SECONDARY,
  padding: 10,
}));

const AccountDetailsBox = Styled.View(({ theme }) => ({
  flexDirection: 'column',
  width: '100%',
  borderRadius: theme.layout.BORDER.SECONDARY,
  backgroundColor: 'white',
  paddingHorizontal: 15,
  paddingVertical: 10,
}));

const ActionButtonGroup = Styled.View(() => ({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 10,
}));

const ActionButton = Styled.TouchableOpacity(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 190,
  width: '100%',
  backgroundColor: 'white',
  paddingHorizontal: 20,
  paddingVertical: 20,
  borderRadius: theme.layout.BORDER.SECONDARY,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.6,
  shadowRadius: 6,
  elevation: 5,
}));

const ButtonGroup = Styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 10,
  paddingTop: 10,
}));
