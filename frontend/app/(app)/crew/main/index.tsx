import { router } from 'expo-router';

import Screen from '@/components/common/Screen';
import NfcCard from '@/components/crew/Card/NfcCard';
import PrevSalaryChartCard from '@/components/crew/Card/PrevSalaryChartCard/PrevSalaryChartCard';
import TimeCard from '@/components/crew/Card/TimeCard';

const CrewMainScreen = () => {
  const handlePressNfcCard = () => {
    router.push('/(app)/crew/main/modal');
  };

  return (
    <Screen viewOption={{ style: { gap: 10 } }}>
      <TimeCard />
      <NfcCard onPress={handlePressNfcCard} />
      <PrevSalaryChartCard />
    </Screen>
  );
};

export default CrewMainScreen;
