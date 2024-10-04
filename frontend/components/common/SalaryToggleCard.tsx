import Styled from '@emotion/native';
import { useEffect, useState } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import Text from '@/components/common/Text';
import useRootStore from '@/zustand';

interface Salary extends TouchableOpacityProps {
  salary: number;
}

const SalaryToggleCard = ({ salary, onPress }: Salary) => {
  const { role } = useRootStore.getState();
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
    <CardContainer style={{ alignItems: 'center', gap: 10, paddingVertical: 28 }} onPress={onPress}>
      <Text size="sub" weight="bold">
        이번달 예상 {role === 'BOSS' ? '급여' : '월급'}
      </Text>
      <Text size="title" weight="bold" color="primary">
        {formattedSalary + ' 원'}
      </Text>
    </CardContainer>
  );
};

const CardContainer = Styled.TouchableOpacity(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
  heigth: 180,
  width: '100%',
  backgroundColor: 'white',
  paddingBottom: 20,
  paddingVertical: 28,
  borderRadius: theme.layout.BORDER.SECONDARY,
  shadowColor: 'rgba(0, 0, 0, 0.3)',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.6,
  shadowRadius: 6,
  elevation: 5,
}));

export default SalaryToggleCard;
