import { router } from 'expo-router';
import { Text } from 'react-native';

import AttendanceStatusCard from '@/components/common/AttendanceStatusCard';
import CardContainer from '@/components/common/CardContainer';
import SalaryChartCard from '@/components/common/SalaryChartCard/SalaryChartCard';
import Screen from '@/components/common/Screen';
import NfcCard from '@/components/crew/Card/NfcCard';
import SalaryCard from '@/components/crew/Card/SalaryCard';
import TimeCard from '@/components/crew/Card/TimeCard';
import withPressable from '@/components/hoc/withPressable';
import { useDailySchedule, useMonthlyAccumulatedSalary, useNearCommuteInfo, usePayStub } from '@/reactQuery/querys';
import format from '@/util/format';
import useRootStore from '@/zustand';

const CrewMainScreen = () => {
  const { logout } = useRootStore();
  const now = new Date();
  const prevMonth = now.getMonth();
  const nearCommuteInfo = useNearCommuteInfo();
  const prevMonthPayCheck = usePayStub(prevMonth);
  const accumulatedSalary = useMonthlyAccumulatedSalary();
  const dailySchedule = useDailySchedule(format.dateToString(now));

  const handlePressNfcCard = () => {
    router.push('/crew/authorized/main/modal');
  };

  const LogoutButton = withPressable(CardContainer);

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
      <LogoutButton onPress={() => logout()}>
        <Text>로그아웃</Text>
      </LogoutButton>
    </Screen>
  );
};

export default CrewMainScreen;
