import { router } from 'expo-router';

import SalaryChartCard from '@/components/common/SalaryChartCard/SalaryChartCard';
import Screen from '@/components/common/Screen';
import NfcCard from '@/components/crew/Card/NfcCard';
import TimeCard from '@/components/crew/Card/TimeCard';

const CrewMainScreen = () => {
  const handlePressNfcCard = () => {
    router.push('/(app)/crew/main/modal');
  };

  return (
    <Screen viewOption={{ style: { gap: 10 } }}>
      <TimeCard />
      <NfcCard onPress={handlePressNfcCard} />
      <SalaryChartCard title="저번달 받은 임금" />
    </Screen>
  );
};

export default CrewMainScreen;
