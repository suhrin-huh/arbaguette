import Styled from '@emotion/native';
import { Image } from 'react-native';

import FireworkImage from '@/assets/images/firework.png';
import ExpectedSalaryCard from '@/components/boss/ExpectedSalaryCard';
import BankingCard from '@/components/common/BankingCard';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import Text from '@/components/common/Text';

const BossBankingScreen = () => {
  return (
    <ScreenContainer>
      <CenterHeaderbar left="none" title="빵Pay" right="bell" />
      <BankingCard />
      <ActionButton>
        <Text size="title" weight="bold">
          직원에게 빵뿌리기
        </Text>
        <Image source={FireworkImage} style={{ resizeMode: 'contain', width: 120, height: 120, marginLeft: 'auto' }} />
      </ActionButton>
      <ExpectedSalaryCard />
    </ScreenContainer>
  );
};

export default BossBankingScreen;

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

const ActionButton = Styled.TouchableOpacity(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 150,
  width: '100%',
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
