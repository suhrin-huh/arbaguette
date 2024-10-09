import Styled from '@emotion/native';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { Image, View } from 'react-native';

import FireworkImage from '@/assets/images/firework.png';
import PayrollImage from '@/assets/images/payroll.png';
import BankingCard from '@/components/common/BankingCard';
import Screen from '@/components/common/Screen';
import Text from '@/components/common/Text';
import ExpectedSalaryCard from '@/components/crew/ExpectedSalaryCard';

const CrewBankingScreen = () => {
  const { getParent } = useNavigation();

  useFocusEffect(() => {
    getParent()?.setOptions({
      title: '빵Pay',
    });
  });

  return (
    <Screen type="scroll" viewOption={{ style: { backgroundColor: 'white' } }}>
      <BankingCard />
      <ActionButtonGroup>
        <ActionButton onPress={() => router.push('/crew/authorized/banking/payStub')}>
          <View>
            <Text size="sub" weight="bold">
              {'급여명세서\n확인하기'}
            </Text>
          </View>
          <Image source={PayrollImage} style={{ resizeMode: 'contain', width: 90, height: 90, marginLeft: 'auto' }} />
        </ActionButton>
        <ActionButton onPress={() => router.navigate('/crew/authorized/banking/event')}>
          <View>
            <Text size="sub" weight="bold">
              {'친구에게\n빵뿌리기'}
            </Text>
          </View>
          <Image source={FireworkImage} style={{ resizeMode: 'contain', width: 90, height: 90, marginLeft: 'auto' }} />
        </ActionButton>
      </ActionButtonGroup>
      <ExpectedSalaryCard />
    </Screen>
  );
};

export default CrewBankingScreen;

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
