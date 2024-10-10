import styled from '@emotion/native';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

import CrewCard from '@/components/boss/management/CrewCard';
import NoneCard from '@/components/boss/management/NoneScheduleCard';
import Button from '@/components/common/Button';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import { useCrewMemberList } from '@/reactQuery/querys';
import useRootStore from '@/zustand';

const InnerContainer = styled(ScrollView)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'visible',
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const MonthButtonArea = styled.View(({ theme }) => ({
  paddingVertical: 10,
  justifyContent: 'center',
  alignItems: 'stretch',
  flexDirection: 'row',
  width: '100%',
  gap: 50,
}));

const ButtonText = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
  color: 'white',
});

const CrewCardArea = styled.View(({ theme }) => ({
  justifyContent: 'center',
  gap: 20,
  paddingVertical: 10,
  paddingBottom: 260,
}));

const MonthBarContainer = styled.View(({ theme }) => ({
  flex: 10,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.color.WHITE,
  borderRadius: 18,
  gap: 10,
  height: 56,
  width: '100%',
}));

const MonthText = styled.Text(({ theme }) => ({
  fontSize: 18,
  fontWeight: 'bold',
  paddingBottom: 5,
}));

const BossManagementScreen = () => {
  const { selectedCompanyName, selectedCompanyId, setRegistCompanyId } = useRootStore();
  const { crewList } = useCrewMemberList(selectedCompanyId);
  const router = useRouter();
  const pushRouteHandler = (crewId: number) => {
    router.push(`/boss/main/management/detail/${crewId}`);
  };
  console.log(crewList);

  const addCrewHandler = () => {
    setRegistCompanyId(selectedCompanyId);
    router.push('/boss/main/management/register');
  };

  return (
    <InnerContainer
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        paddingBottom: 120,
      }}>
      <ContainerView>
        <MonthButtonArea>
          <MonthBarContainer>
            <MonthText>직원 {crewList.length}명</MonthText>
          </MonthBarContainer>
          <Button
            onPress={addCrewHandler}
            size="hug"
            buttonStyle={{ backgroundColor: Colors.GRAY[2], borderRadius: 18, height: 56 }}>
            <ButtonText>직원 추가</ButtonText>
          </Button>
        </MonthButtonArea>

        {/* 직원 카드 리스트 */}
        <CrewCardArea>
          {crewList.length > 0 ? (
            crewList.map(({ id, name, salary, weekdays, profileImage, period, endDate }) => (
              <CrewCard
                type="crew"
                id={id}
                name={name}
                profileImage={profileImage}
                salary={salary}
                key={id}
                day={weekdays}
                pressHandler={() => pushRouteHandler(id)}
                period={period}
                endDate={endDate}
              />
            ))
          ) : (
            <NoneCard title="직원을 추가하세요" fontSize={18} />
          )}
        </CrewCardArea>
      </ContainerView>
    </InnerContainer>
  );
};

export default BossManagementScreen;
