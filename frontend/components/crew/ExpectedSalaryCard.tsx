import Styled from '@emotion/native';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { View } from 'react-native';

import MonthlyEarnedIcon from '@/assets/lottie/monthly_earned.json';
import Text from '@/components/common/Text';
import { useMonthlyEstimatedSalary } from '@/reactQuery/querys';

import SalaryToggleCard from '../common/SalaryToggleCard';

const ExpectedSalaryCard = () => {
  const animation = useRef<LottieView>(null);
  const [isSalaryVisible, setIsSalaryVisible] = useState(false);
  const { estimatedSalary, isLoading } = useMonthlyEstimatedSalary();

  const handlePress = () => {
    setIsSalaryVisible((prev) => !prev);
  };

  if (isLoading) {
    return (
      <SalaryBox onPress={handlePress}>
        <Text>예상 월급을 계산중입니다.</Text>
      </SalaryBox>
    );
  }

  if (isSalaryVisible && estimatedSalary) {
    return <SalaryToggleCard salary={estimatedSalary} />;
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
          이번달 예상 월급은?
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
  backgroundColor: 'white',
  paddingBottom: 20,
  borderRadius: theme.layout.BORDER.SECONDARY,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.6,
  shadowRadius: 6,
  elevation: 5,
}));
