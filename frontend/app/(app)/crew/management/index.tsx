import Styled from '@emotion/native';
import { Link, router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import ShowContractButton from '@/components/crew/ShowContractButton';
import WorkDaysTable from '@/components/crew/Table/WorkDaysTable';
import WorkStatusTable from '@/components/crew/Table/WorkStatusTable';

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
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PlaceInfo>
        <PlaceInfoText>후라이드 참 잘하는 집</PlaceInfoText>
        <ShowContractButton onPress={() => router.push('/crew/management/contract')} />
      </PlaceInfo>
      <MonthText>2024년 9월</MonthText>
      <WorkDaysTable normal={10} absent={8} late={3} earlyLeave={1} />
      <WorkStatusTable />
    </ScrollView>
  );
};

export default CrewManagementScreen;
