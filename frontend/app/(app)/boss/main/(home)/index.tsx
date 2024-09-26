import styled from '@emotion/native';
import { ScrollView } from 'react-native';

import AttendanceStatusCard from '@/components/common/AttendanceStatusCard';
import type { ProfileCardProps } from '@/components/common/AttendanceStatusCard/ProfileCard';
import DateStatusCard from '@/components/common/DateStatusCard';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import TitleDropdown from '@/components/common/Header/TitleDropdown';
import SalaryChartCard from '@/components/common/SalaryChartCard/SalaryChartCard';
import ContainerView from '@/components/common/ScreenContainer';

const profileCardsData = [
  // 목업 데이터
  {
    name: '김철수',
    phoneNumber: '010-1234-5678',
    time: '09:00',
    status: 'work',
  },
  {
    name: '김철수',
    phoneNumber: '010-1234-5678',
    time: '09:00',
    status: 'late',
  },
  {
    name: '김철수',
    phoneNumber: '010-1234-5678',
    time: '09:00',
    status: 'rest',
  },
];

const InnerContainer = styled(ScrollView)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'visible',
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const MainScreen = () => {
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
        <DateStatusCard />
        <AttendanceStatusCard profileCardsData={profileCardsData as ProfileCardProps[]} />
        <SalaryChartCard title="이번달 예상 지출" />
      </ContainerView>
    </InnerContainer>
  );
};

export default MainScreen;
