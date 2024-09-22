import Styled from '@emotion/native';
import { useEffect, useState } from 'react';
import Animated, { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import CardContainer from '@/components/common/CardContainer';

interface SalaryCardProps {
  salary: number;
}

const Title = Styled.Text(({ theme }) => ({
  color: theme.color.BLACK,
  fontSize: 16,
}));

const Salary = Styled(Animated.Text)(({ theme }) => ({
  color: theme.color.PRIMARY,
  fontSize: 24,
  fontWeight: '700',
}));

const SalaryCard = ({ salary }: SalaryCardProps) => {
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
      <Title>이번달 벌고 있는 월급</Title>
      <Salary>{formattedSalary + ' 원'}</Salary>
    </CardContainer>
  );
};

export default SalaryCard;
