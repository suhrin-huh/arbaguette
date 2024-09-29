import styled from '@emotion/native';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

import NoneCard from '@/components/boss/management/NoneScheduleCard';
import AttendanceStatusCard from '@/components/common/AttendanceStatusCard';
import DateStatusCard from '@/components/common/DateStatusCard';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import TitleDropdown from '@/components/common/Header/TitleDropdown';
import SalaryChartCard from '@/components/common/SalaryChartCard/SalaryChartCard';
import ContainerView from '@/components/common/ScreenContainer';
import { useDailySchedule } from '@/reactQuery/querys';

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
  const { id } = useLocalSearchParams<{ id: string }>();
  const daySchedule = useDailySchedule(todayFormatter(), Number(id));
  console.log(daySchedule);
  const crewScheduleInfos = daySchedule?.crews;

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
              title="파리바게트 장덕점"
              onPress={() => {
                console.log('press');
              }}
            />
          }
          onPressLeft={() => {
            console.log('left');
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
