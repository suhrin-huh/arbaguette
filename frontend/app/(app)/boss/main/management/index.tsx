import styled from '@emotion/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, ScrollView } from 'react-native';

import CrewCard from '@/components/boss/management/CrewCard';
import MonthBar from '@/components/boss/management/MonthBar';
import Button from '@/components/common/Button';
import LeftHeaderbar from '@/components/common/Header/LeftHeaderBar';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

const InnerContainer = styled(ScrollView)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'visible',
  paddingVertical: Layout.PADDING.VERTICAL,
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
  paddingBottom: 120,
}));

const mockData = [
  {
    id: 0,
    name: '손다인',
    salary: '12만원',
  },
  {
    id: 1,
    name: '김지원',
    salary: '20만원',
  },
  {
    id: 2,
    name: '박지훈',
    salary: '50만원',
  },
  {
    id: 3,
    name: '박지훈',
    salary: '50만원',
  },
  {
    id: 4,
    name: '박지훈',
    salary: '50만원',
  },
  {
    id: 5,
    name: '박지훈',
    salary: '50만원',
  },
];

const BossManagementScreen = () => {
  return (
    <InnerContainer
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        paddingBottom: 60,
      }}>
      <ContainerView>
        <LeftHeaderbar title="가게 명" right="bell" />
        <MonthButtonArea>
          <MonthBar />
          <Button
            onPress={() => console.log('모두 송금')}
            size="hug"
            buttonStyle={{ backgroundColor: Colors.GRAY[2], borderRadius: 18, height: 56 }}>
            <ButtonText>직원 추가</ButtonText>
          </Button>
        </MonthButtonArea>

        {/* 직원 카드 리스트 */}
        <CrewCardArea>
          {mockData.map(({ id, name, salary }) => (
            <CrewCard
              type="crew"
              id={id}
              name={name}
              salary={salary}
              key={id}
              pressHandler={() => console.log('아아아')}
            />
          ))}
          {/* 직원 추가 버튼 */}
          {/* <CrewCard id={99} type="add" pressHandler={() => console.log('first')} /> */}
        </CrewCardArea>
      </ContainerView>
    </InnerContainer>
  );
};

export default BossManagementScreen;
