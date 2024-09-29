import Styled from '@emotion/native';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import Animated, { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import MonthlyEarnedIcon from '@/assets/lottie/monthly_earned.json';
import CardContainer from '@/components/common/CardContainer';
import Text from '@/components/common/Text';
import { useMonthlyEstimatedSalary } from '@/reactQuery/querys';

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

interface EstimatedSalaryProps {
  salary: number;
}

const SalaryCard = ({ salary }: EstimatedSalaryProps) => {
  const sharedSalary = useSharedValue(0);
  const [formattedSalary, setFormattedSalary] = useState('');

  const animatedSalary = useDerivedValue(() => {
    return Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
    }).format(sharedSalary.value);
  });

  useEffect(() => {
    sharedSalary.value = withTiming(salary, { duration: 2000 });
  }, [salary, sharedSalary]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedSalary(animatedSalary.value);
    }, 16);

    return () => clearInterval(interval);
  }, [animatedSalary]);

  return (
    <CardContainer style={{ alignItems: 'center', gap: 10, paddingVertical: 28 }}>
      <Text size="sub" weight="bold">
        이번달 예상 월급
      </Text>
      <Text size="title" weight="bold" color="primary">
        {formattedSalary + ' 원'}
      </Text>
    </CardContainer>
  );
};

const ExpectedSalaryCard = () => {
  const animation = useRef<LottieView>(null);
  const { estimatedSalary, isLoading } = useMonthlyEstimatedSalary();

  const [isSalaryVisible, setIsSalaryVisible] = useState(false);

  const handlePress = () => {
    setIsSalaryVisible((prev) => !prev);
  };

  return (
    <SalaryBox onPress={handlePress}>
      {isSalaryVisible ? (
        isLoading ? (
          <Text>예상 월급을 계산중입니다.</Text>
        ) : (
          <SalaryCard salary={estimatedSalary} />
        )
      ) : (
        <View>
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
        </View>
      )}
    </SalaryBox>
  );
};

export default ExpectedSalaryCard;
