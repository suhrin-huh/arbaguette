import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';

import Screen from '@/components/common/Screen';
import ShowContractButton from '@/components/crew/ShowContractButton';
import WorkDaysTable from '@/components/crew/Table/WorkDaysTable';
import WorkStatusTable from '@/components/crew/Table/WorkStatusTable';
import { useEmploymentContract, useWorkHistory } from '@/reactQuery/querys';
import Theme from '@/styles/Theme';
import format from '@/util/format';
import useRootStore from '@/zustand';

const PlaceInfo = Styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const PlaceInfoText = Styled.Text({
  fontSize: 20,
});

const MonthText = Styled.Text({
  fontSize: 20,
  marginBottom: 50,
  marginTop: 20,
  fontWeight: 500,
});

const CrewManagementScreen = () => {
  const { year, month } = useLocalSearchParams<Partial<{ year: string; month: string }>>();
  const { crewId } = useRootStore();
  const now = new Date();
  const currentYear = Number(year) || now.getFullYear();
  const currentMonth = (Number(month) || now.getMonth()) + 1;
  const workHistory = useWorkHistory(format.dateToString(new Date(currentYear, currentMonth - 1, 1)));
  const contract = useEmploymentContract(crewId || -1);

  const handleShowContract = () => {
    router.navigate({ pathname: '/crew/authorized/management/contract', params: { url: contract?.url } });
  };

  console.log(workHistory);
  if (!workHistory) return null;

  return (
    <Screen viewOption={{ style: { backgroundColor: Theme.color.WHITE } }} type="scroll">
      <PlaceInfo>
        <PlaceInfoText>{workHistory.companyName}</PlaceInfoText>
        <ShowContractButton onPress={handleShowContract} />
      </PlaceInfo>
      <MonthText>
        {currentYear}년 {currentMonth}월
      </MonthText>
      <WorkDaysTable
        normal={workHistory.normal}
        absent={workHistory.absent}
        late={workHistory.late}
        earlyLeave={workHistory.earlyLeave}
      />
      <WorkStatusTable commuteData={workHistory.commutes} targetDate={workHistory.targetDate} />
    </Screen>
  );
};

export default CrewManagementScreen;
