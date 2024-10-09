import Styled from '@emotion/native';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { View } from 'react-native';

import MonthlyEarnedIcon from '@/assets/lottie/monthly_earned.json';
import Text from '@/components/common/Text';
import { useExpectedExpenses } from '@/reactQuery/querys';
import useRootStore from '@/zustand';

import SalaryToggleCard from '../common/SalaryToggleCard';

const ExpectedSalaryCard = () => {
  const { selectedCompanyId } = useRootStore();
  const animation = useRef<LottieView>(null);
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);
  const expectedExpenses = useExpectedExpenses(selectedCompanyId);
  const handlePress = () => {
    setIsSalaryVisible((prev) => !prev);
  };

  if (isSalaryVisible && expectedExpenses) {
    const { originSalary, tax, allowance } = expectedExpenses;
    const totalAmount = originSalary + allowance - tax;
    return <SalaryToggleCard salary={totalAmount} onPress={handlePress} />;
  }

  return (
    <SalaryBox onPress={handlePress}>
      <View>
        <LottieView
          autoPlay
          ref={animation}
          speed={1.5}
          style={{ width: 150, height: 150 }}
          source={MonthlyEarnedIcon}
        />
        <Text weight="bold" size="sub">
          이번달 예상 급여는?
        </Text>
      </View>
    </SalaryBox>
  );
};

export default ExpectedSalaryCard;

const SalaryBox = Styled.TouchableOpacity(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  gap: 10,
  width: '100%',
  height: 200,
  backgroundColor: 'white',
  paddingBottom: 20,
  borderRadius: theme.layout.BORDER.SECONDARY,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.6,
  shadowRadius: 6,
  elevation: 5,
}));
