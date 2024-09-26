import Styled from '@emotion/native';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

import Screen from '@/components/common/Screen';
import ShowContractButton from '@/components/crew/ShowContractButton';
import WorkDaysTable from '@/components/crew/Table/WorkDaysTable';
import WorkStatusTable from '@/components/crew/Table/WorkStatusTable';
import Theme from '@/styles/Theme';

const PlaceInfo = Styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const PlaceInfoText = Styled.Text({
  fontSize: 16,
});

const MonthText = Styled.Text({
  fontSize: 20,
  marginBottom: 50,
  marginTop: 20,
});

const CrewManagementScreen = () => {
  const { year, month } = useLocalSearchParams<Partial<{ year: string; month: string }>>();
  const now = new Date();
  const currentYear = Number(year) || now.getFullYear();
  const currentMonth = (Number(month) || now.getMonth()) + 1;

  const handleShowContract = () => {
    router.navigate({ pathname: '/crew/management/contract' });
  };

  return (
    <Screen viewOption={{ style: { backgroundColor: Theme.color.WHITE } }}>
      <PlaceInfo>
        <PlaceInfoText>후라이드 참 잘하는 집</PlaceInfoText>
        <ShowContractButton onPress={handleShowContract} />
      </PlaceInfo>
      <MonthText>
        {currentYear}년 {currentMonth}월
      </MonthText>
      <WorkDaysTable normal={10} absent={8} late={3} earlyLeave={1} />
      <WorkStatusTable />
    </Screen>
  );
};

export default CrewManagementScreen;
