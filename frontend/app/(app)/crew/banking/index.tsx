import Styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { Image, View } from 'react-native';

import FireworkImage from '@/assets/images/firework.png';
import PayrollImage from '@/assets/images/payroll.png';
import SmilingImage from '@/assets/images/smiling.png';
import MonthlyEarnedIcon from '@/assets/lottie/monthly_earned.json';
import Button from '@/components/common/Button';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import Text from '@/components/common/Text';

const Container = Styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  gap: 30,
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const UserIcon = Styled.Image(() => ({
  height: 37,
  width: 37,
}));

const MessageBox = Styled.View(() => ({
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  gap: 5,
}));

const AccountContainer = Styled.View(({ theme }) => ({
  width: '100%',
  height: 180,
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.color.PRIMARY,
  borderRadius: theme.layout.BORDER.SECONDARY,
  padding: 10,
}));

const AccountBox = Styled.View(({ theme }) => ({
  width: '100%',
  height: 110,
  borderRadius: theme.layout.BORDER.SECONDARY,
  backgroundColor: 'white',
  paddingHorizontal: 10,
}));

const BoxContainer = Styled.View(() => ({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 10,
}));

const ButtonBox = Styled.TouchableOpacity(({ theme }) => ({
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

const BtnBox = Styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: 10,
}));

const SalaryBox = Styled.TouchableOpacity(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  height: 190,
  width: '100%',
  backgroundColor: 'white',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: theme.layout.BORDER.SECONDARY,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.6,
  shadowRadius: 6,
  elevation: 5,
}));

const CrewBankingScreen = () => {
  const [user, setUser] = useState({ name: '민채', accountNo: '603164-01-5146855 ', balance: '9,700,000원' });
  const animation = useRef<LottieView>(null);
  const salary = 100000;
  return (
    <Container>
      <CenterHeaderbar left="none" title="빵Pay" right="bell" />
      <AccountContainer>
        <MessageBox>
          <UserIcon source={SmilingImage} />
          <Text size="sub" weight="bold" color="white">
            {user.name}님, 즐거운 휴일이네요!
          </Text>
        </MessageBox>
        <AccountBox>
          <Text color="gray">{123456}</Text>
          <Text size="sub" weight="bold">
            9,700,000원
          </Text>
          <BtnBox>
            <Button textStyle={{ fontWeight: 'bold' }}>송금</Button>
            <Button textStyle={{ fontWeight: 'bold' }}>조회</Button>
          </BtnBox>
        </AccountBox>
      </AccountContainer>
      <BoxContainer>
        <ButtonBox onPress={() => router.push('/(app)/crew/banking/certification')}>
          <View>
            <Text size="sub" weight="bold">
              급여명세서
            </Text>
            <Text size="sub" weight="bold">
              확인하기
            </Text>
          </View>
          <Image source={PayrollImage} style={{ resizeMode: 'contain', width: 90, height: 90, marginLeft: 'auto' }} />
        </ButtonBox>
        <ButtonBox>
          <View>
            <Text size="sub" weight="bold">
              친구에게
            </Text>
            <Text size="sub" weight="bold">
              빵뿌리기
            </Text>
          </View>
          <Image source={FireworkImage} style={{ resizeMode: 'contain', width: 90, height: 90, marginLeft: 'auto' }} />
        </ButtonBox>
      </BoxContainer>
      <SalaryBox>
        <LottieView
          autoPlay
          ref={animation}
          speed={1.5}
          style={{
            width: 150,
            height: 150,
          }}
          source={MonthlyEarnedIcon}
        />
        <Text weight="bold" size="sub">
          이번달 예상 월급은?
        </Text>
      </SalaryBox>
    </Container>
  );
};

export default CrewBankingScreen;
