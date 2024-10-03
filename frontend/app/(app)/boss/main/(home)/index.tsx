import styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';

import NoneCard from '@/components/boss/management/NoneScheduleCard';
import AttendanceStatusCard from '@/components/common/AttendanceStatusCard';
import DateStatusCard from '@/components/common/DateStatusCard';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import TitleDropdown from '@/components/common/Header/TitleDropdown';
import SalaryChartCard from '@/components/common/SalaryChartCard/SalaryChartCard';
import ContainerView from '@/components/common/ScreenContainer';
import { useDailySchedule } from '@/reactQuery/querys';
import useRootStore from '@/zustand';

const InnerContainer = styled(ScrollView)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'visible',
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

function todayFormatter() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

const MainScreen = () => {
  const { id, name, address } = useLocalSearchParams<{ id: string; name: string; address: string }>();
  const { selectedCompanyId, selectedCompanyName, setSelectedCompany } = useRootStore();
  const daySchedule = useDailySchedule(todayFormatter(), Number(id));
  const crewScheduleInfos = daySchedule?.crews;

  useEffect(() => {
    setSelectedCompany({
      selectedCompanyId: Number(id),
      selectedCompanyName: name,
      selectedCompanyAddress: address,
    });
  }, [id, name, address]);

  return (
    <InnerContainer
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        paddingBottom: 60,
      }}>
      <ContainerView>
        <CenterHeaderbar
          bgColor="background"
          left="store"
          title={
            <TitleDropdown
              title={name}
              onPress={() => {
                console.log('press');
              }}
            />
          }
          onPressLeft={() => {
            router.push('/boss/config/');
          }}
          onPressRight={() => {
            console.log('right');
          }}
          right="bell"
        />
        <DateStatusCard dayScheduleData={daySchedule} />
        {crewScheduleInfos && crewScheduleInfos.length > 0 ? (
          <AttendanceStatusCard dayScheduleData={crewScheduleInfos} />
        ) : (
          <NoneCard title="금일 출근 예정 직원이 없습니다." fontSize={16} />
        )}
        <SalaryChartCard title="이번달 예상 지출" originSalary={0} tax={0} allowance={0} />
      </ContainerView>
    </InnerContainer>
  );
};

export default MainScreen;
