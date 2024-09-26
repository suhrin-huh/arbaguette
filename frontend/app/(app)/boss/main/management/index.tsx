import styled from '@emotion/native';
import { useRouter } from 'expo-router';
import { ScrollView, StatusBar } from 'react-native';

import CrewCard from '@/components/boss/management/CrewCard';
import MonthBar from '@/components/boss/management/MonthBar';
import Button from '@/components/common/Button';
import LeftHeaderbar from '@/components/common/Header/LeftHeaderBar';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';

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

const mockData = [
  {
    id: 0,
    name: '손다인',
    salary: '12만원',
    day: [0, 3, 6],
  },
  {
    id: 1,
    name: '김지원',
    salary: '20만원',
    day: [2, 3, 6],
  },
  {
    id: 2,
    name: '박지훈',
    salary: '50만원',
    day: [1, 4, 6],
  },
  {
    id: 3,
    name: '박지훈',
    salary: '50만원',
    day: [3],
  },
  {
    id: 4,
    name: '박지훈',
    salary: '50만원',
    day: [5],
  },
  {
    id: 5,
    name: '박지훈',
    salary: '50만원',
    day: [6],
  },
];

const BossManagementScreen = () => {
  const router = useRouter();
  const pushRouteHandler = (id: number) => {
    router.push(`/boss/main/management/detail/${id}`);
  };
  return (
    <InnerContainer
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        paddingBottom: 60,
      }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.BLACK} />
      <ContainerView>
        <LeftHeaderbar title="파리바게트 장덕점" right="bell" bgColor="background" />
        <MonthButtonArea>
          <MonthBar year={2222} month={8} />
          <Button
            onPress={() => console.log('모두 송금')}
            size="hug"
            buttonStyle={{ backgroundColor: Colors.GRAY[2], borderRadius: 18, height: 56 }}>
            <ButtonText>직원 추가</ButtonText>
          </Button>
        </MonthButtonArea>

        {/* 직원 카드 리스트 */}
        <CrewCardArea>
          {mockData.map(({ id, name, salary, day }) => (
            <CrewCard
              type="crew"
              id={id}
              name={name}
              salary={salary}
              key={id}
              day={day as Weekday[]} // 타입 캐스팅 추가
              pressHandler={() => pushRouteHandler(id)}
            />
          ))}
        </CrewCardArea>
      </ContainerView>
    </InnerContainer>
  );
};

export default BossManagementScreen;
