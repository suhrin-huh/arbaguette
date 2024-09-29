import { router } from 'expo-router';

import AttendanceStatusCard from '@/components/common/AttendanceStatusCard';
import SalaryChartCard from '@/components/common/SalaryChartCard/SalaryChartCard';
import Screen from '@/components/common/Screen';
import NfcCard from '@/components/crew/Card/NfcCard';
import SalaryCard from '@/components/crew/Card/SalaryCard';
import TimeCard from '@/components/crew/Card/TimeCard';
import { useDailySchedule, useMonthlyAccumulatedSalary, useNearCommuteInfo, usePayStub } from '@/reactQuery/querys';
import format from '@/util/format';

const CrewMainScreen = () => {
  const now = new Date();
  const prevMonth = now.getMonth();
  const nearCommuteInfo = useNearCommuteInfo();
  const prevMonthPayCheck = usePayStub(prevMonth);
  const accumulatedSalary = useMonthlyAccumulatedSalary();
  const dailySchedule = useDailySchedule(format.dateToString(now));

  const handlePressNfcCard = () => {
    router.push('/crew/authorized/main/modal');
  };

  return (
    <Screen viewOption={{ style: { gap: 10 } }}>
      {nearCommuteInfo && <TimeCard {...nearCommuteInfo} />}
      <NfcCard onPress={handlePressNfcCard} />
      {dailySchedule && <AttendanceStatusCard dayScheduleData={dailySchedule.crews} />}
      {prevMonthPayCheck && (
        <SalaryChartCard
          title="저번달 받은 임금"
          originSalary={prevMonthPayCheck.originSalary}
          tax={prevMonthPayCheck.originSalary}
          allowance={prevMonthPayCheck.originSalary}
        />
      )}
      {!!accumulatedSalary && <SalaryCard salary={accumulatedSalary} />}
    </Screen>
  );
};

export default CrewMainScreen;
