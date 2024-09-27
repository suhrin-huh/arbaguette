import { router } from 'expo-router';

import SalaryChartCard from '@/components/common/SalaryChartCard/SalaryChartCard';
import Screen from '@/components/common/Screen';
import NfcCard from '@/components/crew/Card/NfcCard';
import TimeCard from '@/components/crew/Card/TimeCard';
import { useNearCommuteInfo, usePayStub } from '@/reactQuery/querys';

const CrewMainScreen = () => {
  const prevMonth = new Date().getMonth();
  const nearCommuteInfo = useNearCommuteInfo();
  const prevMonthPayCheck = usePayStub(prevMonth);

  const handlePressNfcCard = () => {
    router.push('/crew/authorized/main/modal');
  };

  return (
    <Screen viewOption={{ style: { gap: 10 } }}>
      {nearCommuteInfo && <TimeCard {...nearCommuteInfo} />}
      <NfcCard onPress={handlePressNfcCard} />
      {prevMonthPayCheck && (
        <SalaryChartCard
          title="저번달 받은 임금"
          originSalary={prevMonthPayCheck.originSalary}
          tax={prevMonthPayCheck.originSalary}
          allowance={prevMonthPayCheck.originSalary}
        />
      )}
    </Screen>
  );
};

export default CrewMainScreen;
