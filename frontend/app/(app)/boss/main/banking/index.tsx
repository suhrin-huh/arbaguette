import Styled from '@emotion/native';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { Image } from 'react-native';

import FireworkImage from '@/assets/images/firework.png';
import ExpectedSalaryCard from '@/components/boss/ExpectedSalaryCard';
import BankingCard from '@/components/common/BankingCard';
import Screen from '@/components/common/Screen';

const BossBankingScreen = () => {
  const { getParent } = useNavigation();

  useFocusEffect(() => {
    getParent()?.setOptions({
      title: '빵Pay',
    });
  });

  return (
    <Screen type="scroll">
      <BankingCard />
      <ActionButtonContainer>
        <ActionButton onPress={() => router.navigate({ pathname: '../../../seperation/', params: { type: 'first' } })}>
          <ActionButtonText>선착순{'\n'}빵뿌리기</ActionButtonText>
          <Image source={FireworkImage} style={{ resizeMode: 'contain', width: 60, height: 60, marginLeft: 'auto' }} />
        </ActionButton>
        <ActionButton
          onPress={() => router.navigate({ pathname: '../../../seperation/near', params: { type: 'near' } })}>
          <ActionButtonText>주변에{'\n'}빵뿌리기</ActionButtonText>
          <Image source={FireworkImage} style={{ resizeMode: 'contain', width: 60, height: 60, marginLeft: 'auto' }} />
        </ActionButton>
      </ActionButtonContainer>
      <ExpectedSalaryCard />
    </Screen>
  );
};

export default BossBankingScreen;

const ActionButtonContainer = Styled.View(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 150,
  width: '100%',
  backgroundColor: theme.color.WHITE,
  paddingHorizontal: 20,
  paddingVertical: 10,
}));

const ActionButton = Styled.TouchableOpacity(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 150,
  width: '48%',
  backgroundColor: theme.color.WHITE,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: theme.layout.BORDER.SECONDARY,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.6,
  shadowRadius: 6,
  elevation: 5,
}));

const ActionButtonText = Styled.Text(({ theme }) => ({
  textAlign: 'left',
  fontSize: 16,
  fontWeight: 'bold',
}));
