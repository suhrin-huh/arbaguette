import Styled from '@emotion/native';
import { router } from 'expo-router';
import { Image, View } from 'react-native';

import FireworkImage from '@/assets/images/firework.png';
import PayrollImage from '@/assets/images/payroll.png';
import BankingCard from '@/components/common/BankingCard';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import Text from '@/components/common/Text';
import ExpectedSalaryCard from '@/components/crew/ExpectedSalaryCard';
import useRootStore from '@/zustand';

const CrewBankingScreen = () => {
  const { logout } = useRootStore();
  logout();
  return (
    <ScreenContainer>
      <CenterHeaderbar left="none" title="빵Pay" right="bell" />
      <BankingCard />
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
