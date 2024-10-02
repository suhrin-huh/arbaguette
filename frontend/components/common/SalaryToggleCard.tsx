import { useEffect, useState } from 'react';
import { useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import CardContainer from '@/components/common/CardContainer';
import Text from '@/components/common/Text';
import useRootStore from '@/zustand';

interface Salary {
  salary: number;
}

const SalaryToggleCard = ({ salary }: Salary) => {
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
    <CardContainer style={{ alignItems: 'center', gap: 10, paddingVertical: 28 }}>
      <Text size="sub" weight="bold">
        이번달 예상 {role === 'BOSS' ? '급여' : '월급'}
      </Text>
      <Text size="title" weight="bold" color="primary">
        {formattedSalary + ' 원'}
      </Text>
    </CardContainer>
  );
};

export default SalaryToggleCard;
